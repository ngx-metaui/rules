#!/usr/bin/env node
'use strict';

const rules = require('@ngx-metaui/rules');
const program = require('commander');
const path = require('path');
const fs = require('fs');


// Running it from sources directly ?
const devMode = process.argv.length > 0 &&
  process.argv[1].indexOf('libs/rules/src/lib/resources/bin/oss.js') > 0;


if (!devMode) {
  program.version(require('../../package').version);
}


program.option('-i, --in <oss-dir>', 'Input OSS file to be wrapped into .ts')
  .option('-o, --out <ts-directory>', 'Target output directory where .ts will be placed')
  .option('-p, --prefix <custom-prefix>', 'Add custom prefix to output file')
  .option('-s, --suffix <custom-suffix>', 'Add custom suffix to output file')
  .option('-n, --index-name <index-file-name>', 'Add custom suffix to output file', 'index')
  .option('-u, --update-index', 'Updates index files that is one disrectory up', false)
  .parse(process.argv);

if (program.in == undefined) {
  console.error(`The specified command (${formatError()}) is invalid.`);
  console.error('For a list of available options please see:');
  program.help();
}

const ossFile = listOSSFiles();

if (ossFile.length > 0) {
  ossFile.forEach(function (file) {
    processOSSFile(file);
  })
}


function processOSSFile(file) {
  console.info(`Processing OSS file: ${file}`);

  const outFile = outputFile(file);
  try {

    const data = fs.readFileSync(file, "utf8");
    validateOSS(data, file);

    const content = data.replace(/\r?\n/g, 'ɵ').replace(/\'/g, '"');
    console.log(`\tWriting TS with OSS content to: ${outFile}`);

    const name = path.basename(file).replace('.oss', '');
    fs.writeFileSync(outFile, tsTemplate(name, content), {encoding: 'utf-8'});

    updateIndexFile(outFile);

  } catch (e) {
    console.error(`Unable to write file: ${outFile}\n${e}`);
    console.error(`Unable to process file: ${outFile}`);
    process.exit(2);
  }
}


function listOSSFiles() {
  const inDirectory = getPath(program.in);
  return fs.readdirSync(inDirectory).filter(function (item) {
    return path.extname(item) === '.oss'
  }).map(function (item) {
    return path.join(inDirectory, item)
  });
}

function outputFile(fileName) {

  const prefix = program.prefix ? program.prefix + '.' : '';
  const suffix = program.suffix ? '.' + program.suffix : '';

  var outDir = path.join(getPath(program.in), 'ts');
  if (program.out) {
    outDir = path.join(getPath(program.out), 'ts');
  }
  if (!fs.existsSync(outDir)) {
    console.warn(`Output directory ${outDir} does not exists. Creating...`);
    fs.mkdirSync(outDir);
  }
  return path.join(outDir, prefix + path.basename(fileName) + suffix + '.ts');
}

function getPath(currentPath) {
  if (path.isAbsolute(currentPath)) {
    return path.normalize(currentPath);
  }
  return path.join(process.cwd(), currentPath);
}


function formatError() {
  var a1 = process.argv[3] ? process.argv[3] + ' ' : '';
  a1 += process.argv[4] ? process.argv[4] + ' ' : '';
  a1 += process.argv[5] ? process.argv[5] + ' ' : '';
  a1 += process.argv[6] ? process.argv[6] + ' ' : '';

  return a1;
}

function validateOSS(data, file) {
  try {
    console.log(`\tValidating: ${file} `);
    const lexer = new rules.OSSLexer(data);
    const parser = new rules.OSSParser(lexer);
    parser.parse();
  } catch (e) {
    console.error(`ERROR: ${file}: ${e.message}`);
    process.exit(2);

  }
}

function updateIndexFile(outFile) {
  if (program.updateIndex) {
    console.log(`\tUpdating index file: ${program.indexName}.ts `);
    const exName = path.basename(outFile).replace('.oss.ts', 'Rule');
    const baseName = path.basename(outFile).replace('.ts', '');
    const expRecord = `'./ts/${baseName}'`;
    const indexPath = path.join(path.dirname(outFile), '../', program.indexName) + '.ts';
    let data = '';

    if (fs.existsSync(indexPath)) {
      data = fs.readFileSync(indexPath, "utf8");
    }

    if (data.indexOf(expRecord) === -1) {
      if (data.lastIndexOf('oss\';')) {
        const cnt = `${data}\nexport {${exName}} from ${expRecord};\n`;
        fs.writeFileSync(indexPath, cnt, {encoding: 'utf-8'});
      } else {
        const cnt = `${data}\nexport {${exName}} from ${expRecord};\n`;
        fs.writeFileSync(indexPath, cnt, {encoding: 'utf-8'});
      }
    }
  }
}

function tsTemplate(file, ossContent) {
  return `/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const ${file}Rule = '${ossContent}';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 `
}
