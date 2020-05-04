exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  });
};
