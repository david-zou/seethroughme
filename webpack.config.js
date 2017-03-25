var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  node: {
    //Zane worked on this, workaround not sure what other stuff happens when i do this...
    net: 'empty',
    fs: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx?$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  },
  
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: "source-map"
}