const path = require('path');

module.exports = {
  entry: './src/app.js', // Update this to match your entry point file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Add any other Webpack configuration options as needed
};