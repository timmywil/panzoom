const fs = require('fs')
const prettier = require('prettier')
const pkg = require('../package.json')
function read(filename) {
  return fs.readFileSync(`${__dirname}/${filename}`, { encoding: 'utf8' })
}
function write(filename, data) {
  return fs.writeFileSync(`${__dirname}/${filename}`, data)
}
// Start with the README
const header = '\n---\n\n## Documentation'
let data = read('../README.md').replace(new RegExp(header + '[^]+'), '') + header

function removeLinks(data) {
  const d = data.replace(/\[([^\]]+)\]\([^)]+\)/g, function (all, name) {
    // Links to source have colons
    // Leave those alone
    return name.indexOf(':') > -1 ? all : name
  })
  return d
}

function addLinks(data) {
  return data
    .replace(/PanzoomOptions/g, '[PanzoomOptions](#PanzoomOptions)')
    .replace(/PanOptions/g, '[PanOptions](#PanOptions)')
    .replace(/ZoomOptions/g, '[ZoomOptions](#ZoomOptions)')
    .replace(/MiscOptions/g, '[MiscOptions](#MiscOptions)')
    .replace(/PanzoomObject/g, '[PanzoomObject](#PanzoomObject)')
    .replace(/CurrentValues/g, '[CurrentValues](#CurrentValues)')
    .replace(/PanzoomEventDetail/g, '[PanzoomEventDetail](#PanzoomEventDetail)')
}

function redoLinks(data) {
  return addLinks(removeLinks(data))
}

/**
 * @param {string} filename
 * @param {Array<string>} functions List of functions to extract from docs
 */
function getModuleFunctions(filename, functions) {
  const available = redoLinks(read(`../docs/modules/${filename}`))
    // Remove everything up to functions
    .replace(/[^]+#{2}\s*Functions/, '')
    .split(/___/)
  return functions
    .map((fn) => {
      const rfn = new RegExp(`###\\s*${fn}[^#]+?`)
      const doc = available.find((existing) => rfn.test(existing))
      return doc || ''
    })
    .join('\n\n')
}

function getInterfaceContent(filename, customHeader) {
  return removeLinks(
    read(`../docs/interfaces/${filename}`)
      .replace(/# Interface:\s*(.+)[^]+##\s*Properties/, customHeader ? customHeader : '## $1')
      .replace(/___/g, '')
      // Remove superfluous type declarations
      .replace(/#### Type declaration\n\n▸ .+/g, '')
      // Remove double "Defined in"
      .replace(/(Defined in: .+)\n\nDefined in: .+/g, '$1')
  )
}

data += getModuleFunctions('panzoom.md', ['default']).replace(/default/g, 'Panzoom')

// Get default options
const source = read('../src/panzoom.ts')
const defaultProps = /const defaultOptions: PanzoomOptions = ({[^]+?\n})/.exec(source)[1]
const parsedDefaults = {}
defaultProps.replace(/(\w+): ([^]+?)(?:,\n|\n})/g, (all, key, value) => {
  parsedDefaults[key] = value.replace(/'/g, '"')
})

const rprops = /(?:`Optional` )?\*\*(\w+)\*\*\s*: [^\n]+/g
function addDefaults(data) {
  return data.replace(rprops, function (all, key) {
    return parsedDefaults[key] ? `${all} (Default: **${parsedDefaults[key]}**)` : all
  })
}

const panzoomOptions =
  '\n\n## `PanzoomOptions`\n\nIncludes `MiscOptions`, `PanOptions`, and `ZoomOptions`\n\n' +
  getInterfaceContent(
    'types.miscoptions.md',
    '## MiscOptions\n\nThese options can be passed to `Panzoom()`, as well as any pan or zoom function. One exception is `force`, which can only be passed to methods like `pan()` or `zoom()`, but not `Panzoom()` or `setOptions()` as it should not be set globally.'
  ) +
  getInterfaceContent(
    'types.panonlyoptions.md',
    '## PanOptions (includes [MiscOptions](#MiscOptions))'
  ) +
  getInterfaceContent(
    'types.zoomonlyoptions.md',
    '## ZoomOptions (includes [MiscOptions](#MiscOptions))'
  )

data += addDefaults(panzoomOptions)

data += getInterfaceContent(
  'types.panzoomobject.md',
  '## PanzoomObject\n\nThese methods are available after initializing Panzoom.'
).replace(/CurrentValues/g, '[CurrentValues](#CurrentValues)')

data += getInterfaceContent('types.currentvalues.md')

const events = read('./EVENTS.md')
data += events

// Write a pretty version
write('../README.md', prettier.format(data, { ...pkg.prettier, parser: 'markdown' }))
