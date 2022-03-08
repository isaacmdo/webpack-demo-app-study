const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    watchContentBase: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
     // filename: "index.html",
      template: "./src/views/home.ejs"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", 
          "css-loader", 
          "sass-loader"
        ]
      },
    ]
  }
});