const chalk = require('chalk');

const error = (...args) => {
  console.log(chalk.red('[MDXP ERROR]'), ...args);
};

const log = (...args) => {
  console.log(chalk.green('[MDXP]'), ...args);
};

module.exports = {
  log,
  error
};
