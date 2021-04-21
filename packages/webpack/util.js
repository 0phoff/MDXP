#!/usr/bin/env node
const os = require('os');
const path = require('path');
const exec = require('child_process').execSync;
const yon = require('yarn-or-npm');
const fs = require('fs-extra');
const log = require('./log.js');
const pkg = require('./package.json');
const https = require('https');
const gunzip = require('gunzip-maybe');
const tar = require('tar-fs');

// Code stolen and adapted from Initit
const install = () => {
  return yon.spawn.sync(['install'], {stdio: 'inherit'});
};

// Code stolen from Initit
// Modified to work on Windows as in
// https://github.com/pomber/create-code-surfer-deck/blob/master/initit.js
const getTar = async ({
  user,
  repo,
  path = '',
  name
}) => {
  const url = `https://codeload.github.com/${user}/${repo}/tar.gz/@mdxp/create-webpack@${pkg.version}`;

  const extractTar = tar.extract(name, {
    map: header => {
      const prefix = `${repo}--mdxp-create-webpack-${pkg.version}/${path}`;

      if (header.name.startsWith(prefix)) {
        return Object.assign({}, header, {
          name: header.name.substr(prefix.length)
        });
      }

      return header;
    }
  });

  return new Promise((resolve, reject) => {
    https.get(
      url,
      response => response.pipe(gunzip()).pipe(extractTar)
    );

    extractTar.on('error', reject);
    extractTar.on('finish', resolve);
  });
};

// Code stolen from Initit
const gitInit = () => {
  exec('git --version', {stdio: 'inherit'});
  exec('git init', {stdio: 'inherit'});
  exec('git add .', {stdio: 'inherit'});
  exec('git commit -am "Init"', {stdio: 'inherit'});
  return true;
};

// Code stolen and adapted from Initit
const create = async ({folder, git = false}) => {
  if (!folder) {
    throw new Error('folder argument required');
  }

  // Create dirs
  const dirname = path.resolve(folder);
  const name = path.basename(dirname);
  fs.ensureDirSync(dirname);
  fs.ensureDirSync(dirname + '/dist/web');
  fs.ensureDirSync(dirname + '/dist/onepage');

  // Get template
  log.log('Getting template');
  await getTar(Object.assign({}, {
    name: dirname,
    user: '0phoff',
    repo: 'MDXP',
    path: 'packages/webpack/template'
  }));

  // Setup version
  log.log('Setting up package.json');
  const templatePkg = require(path.join(dirname, 'package.json'));
  const pkg = Object.assign({}, templatePkg, {
    name,
    version: '1.0.0'
  });
  fs.writeFileSync(
    path.join(dirname, 'package.json'),
    JSON.stringify(pkg, null, 2) + os.EOL
  );

  // Go into dir and install
  log.log('Installing dependencies');
  process.chdir(dirname);
  install();

  // Init git repo
  if (git) {
    log.log('Initializing git');
    gitInit();
  }

  return {name, dirname};
};

module.exports = create;
