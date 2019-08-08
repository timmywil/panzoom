const fs = require('fs')
const prettier = require('prettier')
function read(filename) {
  return fs.readFileSync(`${__dirname}/${filename}`, { encoding: 'utf8' })
}
function write(filename, data) {
  return fs.writeFileSync(`${__dirname}/${filename}`, data)
}
// Start with the README
const header = '\n---\n\n## Documentation'
let data = read('../README.md').replace(new RegExp(header + '[\\w\\W]+'), '') + header

function redoLinks(data) {
  return (
    data
      // Remove links that aren't links to source
      .replace(/\[([^:]+)\]\(.*?\)/g, '$1')
      .replace(/PanzoomOptions/g, '[PanzoomOptions](#PanzoomOptions)')
      .replace(/PanzoomObject/g, '[PanzoomObject](#PanzoomObject)')
      .replace(/CurrentValues/g, '[CurrentValues](#CurrentValues)')
  )
}

const constructor = read('../docs/modules/_panzoom_.md')
  // Remove unwanted text
  .replace(/[\w\W]+###\s*Panzoom/, '')
  .replace('## Object literals\n\n', '')
  .replace('### ▪ **defaultOptions**: *object*\n\n', '')
data += '\n\n### Default export\n\n' + redoLinks(constructor)

const panzoomOptions =
  read('../docs/interfaces/_types_.miscoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `MiscOptions`\n') +
  read('../docs/interfaces/_types_.panoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `PanOptions`\n\nIncludes `MiscOptions`\n\n') +
  read('../docs/interfaces/_types_.zoomoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `ZoomOptions`\n\nIncludes `MiscOptions`\n\n')
data +=
  '\n\n## `PanzoomOptions`\n\nIncludes `MiscOptions`, `PanOptions`, and `ZoomOptions`\n\n' +
  redoLinks(panzoomOptions)

const panzoomObject = read('../docs/interfaces/_types_.panzoomobject.md')
  // Remove unwanted text
  .replace(/[\w\W]+##\s*Properties/, '')
  // Type declaration refers to the signature
  .replace(/Type declaration:/g, 'Signature with return type:')
data += '\n\n---\n\n## `PanzoomObject`\n' + redoLinks(panzoomObject)

const currentValues = read('../docs/interfaces/_types_.currentvalues.md')
  // Remove unwanted text
  .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `CurrentValues`\n')
data += currentValues

// Write a pretty version
write('../README.md', prettier.format(data, { parser: 'markdown' }))
