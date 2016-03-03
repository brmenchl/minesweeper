const HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: __dirname + '/src',
  build: __dirname + '/build'
}

module.exports = {
  entry: [PATHS.src],
  resolve: {
    extensions: ['','.js','.jsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.build
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      inject: false,
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Minesweeper',
      appMountId: 'app'
    })
  ],
  devtool: 'eval-source-map'
}