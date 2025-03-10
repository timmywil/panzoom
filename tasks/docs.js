import fs from 'fs'
import prettier from 'prettier'
import { fileURLToPath } from 'url'

const dirname = fileURLToPath(new URL('.', import.meta.url))

function read(filename) {
  return fs.readFileSync(`${dirname}${filename}`, { encoding: 'utf8' })
}
function write(filename, data) {
  return fs.writeFileSync(`${dirname}${filename}`, data)
}

const pkg = JSON.parse(read('../package.json'))

// Start with the README
const header = '\n---\n\n# Documentation'
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
    .replace(/PanzoomGlobalOptions/g, '[PanzoomGlobalOptions](#PanzoomGlobalOptions)')
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

function getModuleFunction(fn) {
  return (
    redoLinks(read(`../docs/panzoom/functions/${fn}.md`))
      // Remove everything up to function
      .replace(/[^]+#\s*Function:/, '\n\n## ')
  )
}

function getInterfaceContent(filename, customHeader) {
  return removeLinks(
    read(`../docs/types/interfaces/${filename}`)
      // Remove everything up to interface
      .replace(/[^]+#\s*Interface/, '# Interface')
      .replace(/# Interface:[^\n]+/, customHeader ? customHeader : '## $1')
      .replace(/___/g, '')
      // Remove superfluous type declarations
      .replace(/#### Type declaration\n\n▸ .+/g, '')
      // Remove double "Defined in"
      .replace(/(Defined in: .+)\n\nDefined in: .+/g, '$1')
  )
}

data += getModuleFunction('default').replace(/default/g, 'Panzoom')

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
    'MiscOptions.md',
    '## MiscOptions\n\nThese options can be passed to `Panzoom()`, as well as any pan or zoom function. One exception is `force`, which can only be passed to methods like `pan()` or `zoom()`, but not `Panzoom()` or `setOptions()` as it should not be set globally.'
  ) +
  getInterfaceContent('PanOnlyOptions.md', '## PanOptions (includes [MiscOptions](#MiscOptions))') +
  getInterfaceContent('ZoomOnlyOptions.md', '## ZoomOptions (includes [MiscOptions](#MiscOptions))')

data += addDefaults(panzoomOptions)

data += getInterfaceContent(
  'PanzoomObject.md',
  '## PanzoomObject\n\nThese methods are available after initializing Panzoom.'
).replace(/CurrentValues/g, '[CurrentValues](#CurrentValues)')

data += getInterfaceContent('CurrentValues.md')

const events = read('./EVENTS.md')
data += events

// Write a pretty version
const formatted = await prettier.format(data, { ...pkg.prettier, parser: 'markdown' })
write('../README.md', formatted)
