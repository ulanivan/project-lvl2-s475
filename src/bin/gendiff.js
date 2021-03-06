#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.4.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((pathToFirstFile, pathToSecondFile) => {
    console.log(genDiff(pathToFirstFile, pathToSecondFile, program.format));
  })
  .parse(process.argv);
