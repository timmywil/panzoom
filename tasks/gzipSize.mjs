import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { gzipSizeSync } from 'gzip-size'
import path from 'node:path'

const dirname = fileURLToPath(import.meta.url)

const contents = fs.readFileSync(path.join(dirname, '../..', 'dist/panzoom.min.js'), 'utf-8')

console.log('gzipped size:', gzipSizeSync(contents))
