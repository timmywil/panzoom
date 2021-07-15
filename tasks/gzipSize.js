const fs = require('fs')
const path = require('path')
const gzipSize = require('gzip-size')

const contents = fs.readFileSync(path.join(__dirname, '..', 'dist/panzoom.min.js'), 'utf-8')

console.log('gzipped size:', gzipSize.sync(contents))
