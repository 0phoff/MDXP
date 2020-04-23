const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist/onepage"),
    filename: "main.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          },
          {
            test: /\.mdx$/,
            use: ["babel-loader", "@mdx-js/loader"]
          },
          {
            test: /\.html$/,
            use: ["html-loader"]
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          },
          {
            test: /\.(png|jpe?g|gif|bmp|webp)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10485760   // 10 Mb limit -> aim is to present and have single file if possible
                }
              }
            ]
          },
          {
            exclude: [/\.(js|mjs|jsx|mdx)$/, /\.html$/, /\.json$/],
            use: ["file-loader"]
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "./index.html",
    }),
    new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/.(js|css)$/]),
  ]
};
