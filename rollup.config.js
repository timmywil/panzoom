import typescript from 'rollup-plugin-typescript2'
export default {
  input: './index.ts',
  plugins: [typescript()],
  output: {
    format: 'umd',
    name: 'Panzoom',
    file: 'panzoom.js'
  },
  watch: {
    include: './index.ts'
  }
}
