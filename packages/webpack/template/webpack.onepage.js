const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const remarkEmoji = require('remark-emoji');
const remarkMath = require('remark-math');
const remarkFlattenImages = require('mdast-flatten-image-paragraphs');
const rehypeAutoImport = require('@mdxp/rehypex-plugins/auto-import');
const rehypeBetterMedia = require('@mdxp/rehypex-plugins/better-media');
const rehypeTableAlign = require('@mdxp/rehypex-plugins/table-align');
const rehypeKatex = require('rehype-katex');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/onepage'),
    filename: 'main.js',
    publicPath: './'
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
                    rehypeTableAlign,
                    [rehypeBetterMedia, {videoMarker: '!video!'}],
                    [rehypeAutoImport, {noImport: '!noimport!'}]
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
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  svgo: false
                }
              },
              'url-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif|bmp|webp)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10485760 // 10 Mb limit -> aim is to present and have single file if possible
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
    }),
    new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/.(js|css)$/])
  ],

  node: {
    fs: 'empty'
  }
};
