#!/usr/bin/env node

const program = require('commander');
const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

function init(initDirectory) {
  console.log();
  
  fsExtra.copy(path.resolve(__dirname, 'bundle'), initDirectory, (err) => {
    if (err) {
      console.log(chalk.red(err));
      return;
    }

    console.log(chalk.blue('Installing packages via npm ...'));
    console.log();

    const npm = spawn('npm', ['install'], {
      cwd: initDirectory
    });

    npm.stderr.on('data', (data) => {
      console.log(data);
    })

    npm.stdout.on('data', (data) => {
      console.log(data);
    })

    npm.on('error', (error) => {
      console.log(error);
    })

    npm.on('close', () => {
      console.log(chalk.green('Done!'));
    })
  })
}

program
  .version('0.0.1')
  .command('init')
  .description('Creates a new react project in the current folder')
  .action(() => {init(process.cwd())});

program
  .command('new <project-directory>')
  .description('Creates a new react project in the given folder')
  .action((dir) => {
    const absoluteDir = path.resolve(process.cwd(), dir);

    fs.exists(absoluteDir, (result) => {
      if (!result) {
        fs.mkdir(absoluteDir, (err) => {
          console.log(chalk.red(err));
        });
      }
      
      init(absoluteDir);
    });
  });

program
  .parse(process.argv);