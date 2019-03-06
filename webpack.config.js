const path = require('path');


module.exports = {
  entry: {
    app: [
      './src/app.js',
      './index.html',
      './style.css'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }},
      {
        test: /\.html?$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
          }
        },
        {
          loader: "file-loader",
          options: {
            name: "[name].html?[hash:8]"
          }
        }]
      },
      {
        test: /\.css?$/,
        use: [
          {
            loader: "restyle-loader"
          },
          {
            loader: "file-loader",
            options: {
              name: "[name].css?[hash:8]"
            }
          }
        ]
      }
    ]
  }
}