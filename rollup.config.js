import typescript from 'rollup-plugin-typescript2'
export default {
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
    banner: `/**
 * Panzoom for panning and zooming elements using CSS transforms
 * Copyright Timmy Willison and other contributors
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 */`,
    format: 'umd',
    name: 'Panzoom',
    file: 'dist/panzoom.js'
  },
  watch: {
    include: './src'
  }
}
