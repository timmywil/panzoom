const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    'demo/index.html': './demo/index.tsx',
    panzoom: './demo/global-panzoom.ts'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'demo'),
      serveIndex: true,
      watch: true
    },
    host: '0.0.0.0',
    hot: true,
    open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Panzoom',
      template: 'demo/_index.html'
    })
  ]
}
