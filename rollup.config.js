import typescript from 'rollup-plugin-typescript2'
export default {
  input: './panzoom.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015'
        }
      },
      exclude: ['node_modules', '**/*.test.ts']
    })
  ],
  output: {
    format: 'umd',
    name: 'Panzoom',
    file: 'dist/panzoom.js'
  },
  watch: {
    include: './panzoom.ts'
  }
}
