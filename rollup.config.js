import { readFile } from 'node:fs/promises'
import typescript from 'rollup-plugin-typescript2'

const pkg = await readFile('./package.json', { encoding: 'utf-8' }).then(JSON.parse)

const banner = `/**
* Panzoom ${pkg.version} for panning and zooming elements using CSS transforms
* Copyright Timmy Willison and other contributors
* https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
*/`

export default [
  {
    input: './src/panzoom.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'test'],
          compilerOptions: {
            declaration: true,
            module: 'esnext',
            moduleResolution: 'node',
            target: 'es5'
          }
        }
      })
    ],
    output: {
      banner,
      file: 'dist/panzoom.js',
      format: 'umd',
      name: 'Panzoom'
    },
    watch: {
      include: './src'
    }
  },
  {
    input: './src/panzoom.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'test'],
          compilerOptions: {
            module: 'esnext',
            moduleResolution: 'node',
            target: 'es5'
          }
        }
      })
    ],
    output: {
      banner,
      file: 'dist/panzoom.es.js',
      format: 'es',
      name: 'Panzoom'
    },
    watch: {
      include: './src'
    }
  }
]
