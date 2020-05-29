#!/usr/bin/env node
const os = require('os');
const path = require('path');
const exec = require('child_process').execSync;
const yon = require('yarn-or-npm');
const fs = require('fs-extra');
const log = require('./log.js');

// Code stolen and adapted from Initit
const install = () => {
  return yon.spawn.sync(['install'], {stdio: 'inherit'});
};

// Code stolen from Initit
const getTar = ({
  user,
  repo,
  path = '',
  name
}) => {
  const url = `https://codeload.github.com/${user}/${repo}/tar.gz/master`;
  const cmd = `curl ${url} | tar -xz -C ${name} --strip=4 ${repo}-master/${path}`;
  exec(cmd, {stdio: 'inherit'});
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
  fs.ensureDirSync(name);
  fs.ensureDirSync(name + '/dist/web');
  fs.ensureDirSync(name + '/dist/onepage');

  // Get template
  log.log('Getting template');
  getTar(Object.assign({}, {
    name,
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
