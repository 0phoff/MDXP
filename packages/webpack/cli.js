const fs = require('fs');
const meow = require('meow');
const create = require('./util.js');
const log = require('./log.js');


const cli = meow(`
  Usage
    $ npm init @mdxp/webpack folder-name
    $ npx @mdxp/create-webpack folder-name

  Options
    --git, -g     Initialize empty git repository
    --help, -h    Show help
    --version, -v Show version
`,
  {
    booleanDefault: undefined,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
      git: {
        type: 'boolean',
        alias: 'g'
      }
    }
  }
)

// Extract folder
const [folder] = cli.input
if (!folder) {
  cli.showHelp(0);
}

// Check if folder empty
const dir = path.resolve(folder)
if (fs.existsSync(dir) && fs.readdirSync(dir).length !== 0) {
  log.error('Folder not empty!');
  process.exit(1);
}

// Create template
create(folder, cli.flags.git)
  .then(res => {
    log.log('Deck initialized')
    process.exit(0)
  })
  .catch(err => {
    log.error('Deck initialisation failed')
    log.error(err)
    process.exit(1)
  })
