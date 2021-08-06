import typescript from 'rollup-plugin-typescript2'

const banner = `/**
* Panzoom for panning and zooming elements using CSS transforms
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
            declaration: true
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
          exclude: ['node_modules', 'test']
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
