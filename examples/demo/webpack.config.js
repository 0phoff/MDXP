const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const remarkEmoji = require('remark-emoji');
const remarkMath = require('remark-math');
const remarkFlattenImages = require('mdast-flatten-image-paragraphs');
const rehypeAutoImport = require('@MDXP/rehypex-plugins/auto-import');
const rehypeBetterMedia = require('@MDXP/rehypex-plugins/better-media');
const rehypeKatex = require('rehype-katex');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/web'),
    filename: 'main.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.mdx$/,
            use: [
              'babel-loader',
              {
                loader: '@mdx-js/loader',
                options: {
                  remarkPlugins: [
                    remarkEmoji,
                    remarkMath,
                    remarkFlattenImages
                  ],
                  rehypePlugins: [
                    rehypeKatex,
                    [rehypeBetterMedia, {altVideoMarker: '!video!'}],
                    rehypeAutoImport
                  ]
                }
              }
            ]
          },
          {
            test: /\.html$/,
            use: ['html-loader']
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          {
            test: /\.(png|jpe?g|gif|bmp|webp)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
          },
          {
            exclude: [/\.(js|mjs|jsx|mdx)$/, /\.html$/, /\.json$/],
            use: ['file-loader']
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html'
    })
  ],

  node: {
    fs: 'empty'
  }
};
