const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const remarkCodeImport = require('remark-code-import');
const remarkEmoji = require('remark-emoji');
const remarkMath = require('remark-math');
const remarkFlattenImages = require('mdast-flatten-image-paragraphs');
const rehypeAutoImport = require('@mdxp/rehypex-plugins/auto-import');
const rehypeBetterMedia = require('@mdxp/rehypex-plugins/better-media');
const rehypeTableAlign = require('@mdxp/rehypex-plugins/table-align');
const rehypeKatex = require('rehype-katex');

// Variables
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
const ANALYZE = Boolean(process.env.ANALYZE) || false;
const MDXP_MODE = (process.env.MDXP_MODE || 'web').toLowerCase();

// Mode Config
let cfg = null;
if (MDXP_MODE === 'onepage') {
  cfg = {
    output: {
      path: path.resolve(__dirname, 'dist/onepage'),
      filename: 'main.js',
      publicPath: './'
    },
    babel: {
      presets: [
        [
          '@babel/preset-env',
          {modules: false}
        ],
        '@babel/preset-react'
      ]
    },
    inlineImageLimit: 10485760,
    plugins: [
      new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/.(js|css)$/])
    ]
  };
} else {
  cfg = {
    output: {
      path: path.resolve(__dirname, 'dist/web'),
      filename: 'main.js',
      publicPath: PUBLIC_PATH
    },
    babel: {
      presets: [
        [
          '@babel/preset-env',
          {modules: false}
        ],
        '@babel/preset-react'
      ]
    },
    inlineImageLimit: 8192,
    plugins: []
  };
}

if (ANALYZE) {
  cfg.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    })
  );
}

// Main Config
module.exports = {
  entry: './src/index.jsx',
  output: cfg.output,

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: cfg.babel
              }
            ]
          },
          {
            test: /\.mdx$/,
            use: [
              {
                loader: 'babel-loader',
                options: cfg.babel
              },
              {
                loader: '@mdx-js/loader',
                options: {
                  remarkPlugins: [
                    remarkCodeImport,
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
                  limit: cfg.inlineImageLimit
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
    new WebpackBar(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
    }),
    ...cfg.plugins
  ],

  devServer: {
    noInfo: true,
    stats: 'minimal'
  },
  node: {
    fs: 'empty'
  }
};
