const path = require('path')

module.exports = {
  mode: 'development',
  entry: './public/javascripts/calendar.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'calendar.js',
    path: path.join(__dirname, 'public/dist')
  },
  devtool: 'sourcemap'
}