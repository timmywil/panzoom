import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    'demo/index.html': './demo/index.tsx',
    panzoom: './demo/global-panzoom.ts'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.js']
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: 'demo',
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
