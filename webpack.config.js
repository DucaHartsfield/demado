
module.exports = {
  entry: {
    background: './src/js/entrypoints/background.js',
    configs:    './src/js/entrypoints/pages/configs.js',
  },
  output: {
    filename: './dest/js/[name].js',
  },
  module: {
    loaders: [
      {test: /\.js$/,loaders: ['babel-loader']},
      {test: /\.(sa|c)ss$/,loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(eot|woff|woff2|ttf|svg)$/,loaders:['url-loader']},
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: []
};