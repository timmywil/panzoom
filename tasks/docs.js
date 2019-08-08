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
      .replace(/PanzoomOptions/, '[PanzoomOptions](#PanzoomOptions)')
      .replace(/PanzoomObject/, '[PanzoomObject](#PanzoomObject)')
      .replace(/CurrentValues/, '[CurrentValues](#CurrentValues)')
  )
}

const constructor = read('../docs/modules/_panzoom_.md')
  // Remove unwanted text
  .replace(/[\w\W]+###\s*Panzoom/, '')
  .replace('## Object literals\n\n', '')
  .replace('### ▪ **defaultOptions**: *object*\n\n', '')
data += '\n\n### Default export\n\n' + redoLinks(constructor)

const panzoomOptions =
  '\n\n## <a name="PanzoomOptions">`PanzoomOptions` includes `MiscOptions`, `PanOptions`, and `ZoomOptions`</a>\n' +
  read('../docs/interfaces/_types_.miscoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `MiscOptions`\n') +
  read('../docs/interfaces/_types_.panoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `PanOptions` (includes `MiscOptions`)\n') +
  read('../docs/interfaces/_types_.zoomoptions.md')
    // Remove unwanted text
    .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## `ZoomOptions` (includes `MiscOptions`)\n')
data += redoLinks(panzoomOptions)

const panzoomObject = read('../docs/interfaces/_types_.panzoomobject.md')
  // Remove unwanted text
  .replace(
    /[\w\W]+##\s*Properties/,
    '\n\n---\n\n## <a name="PanzoomObject">`PanzoomObject` includes the following methods:</a>\n'
  )
  // Type declaration refers to the signature
  .replace(/Type declaration:/g, 'Signature with return type:')
data += redoLinks(panzoomObject)

const currentValues = read('../docs/interfaces/_types_.currentvalues.md')
  // Remove unwanted text
  .replace(/[\w\W]+##\s*Properties/, '\n\n---\n\n## <a name="CurrentValues">`CurrentValues`</a>\n')
data += currentValues

// Write a pretty version
write('../README.md', prettier.format(data, { parser: 'markdown' }))
