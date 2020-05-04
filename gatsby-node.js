const path = require('path');

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    node: {
      fs: 'empty'
    },
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, '../src/gatsby-theme-docz/components/'),
        '@core': path.resolve(__dirname, '../packages/core/'),
        '@components': path.resolve(__dirname, '../packages/components/')
      }
    }
  });
};
