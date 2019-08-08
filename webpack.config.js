const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    'demo/index': './demo/index.tsx'
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
    contentBase: __dirname,
    hot: true,
    open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Panzoom',
      template: 'demo/_index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
