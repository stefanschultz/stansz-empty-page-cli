/**
 * @author Stefan Schultz (Software Schultz)
 * 
 * Terminal commander to manage user inputs on console.
 */
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const {
  general_constants,
  units_constants,
  file_formats_constants,
  page_orientation_constants
}  = require('../constants/general');
const chalk = require('chalk');
const { generateDocumentDocx } = require('../core/generate-document-docx');
const { generateDocumentPdf } = require('../core/generate-document-pdf');
const { generateDocumentPng } = require('../core/generate-document-png');
const { generateDocumentJpeg } = require('../core/generate-document-jpeg');
let {
  pageObjectModel,
  DEFAULT_UNIT,
  DEFAULT_PAGE_WIDTH,
  DEFAULT_PAGE_HEIGHT,
  DEFAULT_PAGE_ORIENTATION,
  DEFAULT_PAGE_RESOLUTION,
  DEFAULT_FILE_NAME,
  DEFAULT_OUTPUT_PATH
} = require('../models/pageObjectModel');


const startTerminalMenu = function startTerminalMenu() {
  const program = new Command();
  program.version(general_constants.programVersion, '-v, --version', 'current verion of tool');
  program.name(general_constants.programName);
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-un, --unit <type>', 'unit (mm=Millimeter, in=Inch, pt=Point, px=Pixel)')
    .option('-pw, --page-width <type>', 'page width')
    .option('-ph, --page-height <type>', 'page height')
    .option('-po, --page-orientation <type>', 'page orientation (p=portrait, l=landscape)')
    .option('-ff, --file-format <type>', 'file format (pdf=PDF, png=PNG Image, jpeg/jpg=JPEG Image, docx/doc=Word Document)')
    .option('-fn, --file-name <type>', 'file name (e.g. default is "myDocument.*")')
    .option('-op, --output-path <type>', 'output path (e.g. "c:\\output_directory\\", default is same folder "./")');

  program.parse(process.argv);
  
  const options = program.opts();
  
  if (options && (
    options.unit ||
    options.pageWidth ||
    options.pageHeight ||
    options.pageOrientation ||
    options.fileFormat ||
    options.fileName ||
    options.outputPath
  )) {
    let correctArgumentsInTerminal = {
      unit: false,
      pageWidth: false,
      pageHeight: false,
      pageOrientation: false,
      fileFormat: false,
      fileName: false,
      outputPath: false
    };
  
    let pom = pageObjectModel;
    
    console.log('\nSummary:\n--------');
    
    // unit
    if (options.unit && options.unit.length >= 1) {
      if (options.unit === units_constants.mm) {
        console.log('Unit: ' + chalk.green(options.unit));
        pom.unit = units_constants.mm;
        correctArgumentsInTerminal.unit = true;
      } else if (options.unit === units_constants.in) {
        console.log('Unit: ' + chalk.green(options.unit));
        pom.unit = units_constants.in;
        correctArgumentsInTerminal.unit = true;
      } else if (options.unit === units_constants.px) {
        console.log('Unit: ' + chalk.green(options.unit));
        pom.unit = units_constants.px;
        correctArgumentsInTerminal.unit = true;
      } else {
        console.log('Unit: ' + chalk.red(`WRONG INPUT ${options.unit}`));
        correctArgumentsInTerminal.unit = false;
      }
    } else {
      console.log('Unit: ' + chalk.red(`WRONG INPUT ${options.unit}`));
      correctArgumentsInTerminal.unit = false;
    }
  
    // page width
    if (options.pageWidth && options.pageWidth.length >= 1) {
      let width = Number(options.pageWidth);
      if (!isNaN(width)) {
        console.log('Width: ' + chalk.green(width));
        pom.pageWidth = width;
        correctArgumentsInTerminal.pageWidth = true;
      } else {
        console.log('Width: ' + chalk.red(`WRONG INPUT - not a number - ${options.pageWidth}`));
        correctArgumentsInTerminal.pageWidth = false;
      }
    } else {
      console.log('Width: ' + chalk.red(`WRONG INPUT ${options.pageWidth}`));
      correctArgumentsInTerminal.pageWidth = false;
    }
  
    // page height
    if (options.pageHeight && options.pageHeight.length >= 1) {
      let height = Number(options.pageHeight);
      if (!isNaN(height)) {
        console.log('Height: ' + chalk.green(height));
        pom.pageHeight = height;
        correctArgumentsInTerminal.pageHeight = true;
      } else {
        console.log('Height: ' + chalk.red(`WRONG INPUT - not a number - ${options.pageHeight}`));
        correctArgumentsInTerminal.pageHeight = false;
      }
    } else {
      console.log('Height: ' + chalk.red(`WRONG INPUT ${options.pageHeight}`));
      correctArgumentsInTerminal.pageHeight = false;
    }
  
    // page orientation
    if (options.pageOrientation && options.pageOrientation.length >= 1) {
      if (options.pageOrientation === 'p' || options.pageOrientation === page_orientation_constants.portrait) { // portrait
        console.log('Orientation: ' + chalk.green(page_orientation_constants.portrait + '(' + page_orientation_constants_shortcut.portrait + ')'));
        pom.pageOrientation = page_orientation_constants_shortcut.portrait;
        correctArgumentsInTerminal.pageOrientation = true;
      } else if (options.pageOrientation === 'l' || options.pageOrientation === page_orientation_constants.landscape) { // landscape
        console.log('Orientation: ' + chalk.green(page_orientation_constants.landscape + '(' + page_orientation_constants_shortcut.landscape + ')'));
        pom.pageOrientation = page_orientation_constants_shortcut.landscape;
        correctArgumentsInTerminal.pageOrientation = true;
      } else {
        console.log(`Orientation: ` + chalk.yellow(`no input, set to default ("${DEFAULT_PAGE_ORIENTATION}")`));
        pom.pageOrientation = DEFAULT_PAGE_ORIENTATION;
        correctArgumentsInTerminal.pageOrientation = true;
      }
    } else {
      console.log(`Orientation: ` + chalk.yellow(`no input, set to default ("${DEFAULT_PAGE_ORIENTATION}")`));
      pom.pageOrientation = DEFAULT_PAGE_ORIENTATION;
      correctArgumentsInTerminal.pageOrientation = true;
    }
  
    // page format
    if (options.fileFormat && options.fileFormat.length >= 1) {
      if (
        // options.fileFormat === file_formats_constants.docx ||
        // options.fileFormat === file_formats_constants.doc ||
        options.fileFormat === file_formats_constants.pdf ||
        options.fileFormat === file_formats_constants.png ||
        options.fileFormat === file_formats_constants.jpeg ||
        options.fileFormat === file_formats_constants.jpg
      ) {
        console.log('Format: ' + chalk.green(options.fileFormat));
        pom.fileFormat = options.fileFormat;
        correctArgumentsInTerminal.fileFormat = true;
      } else {
        console.log(`Format: ` + chalk.yellow(`no input, set to default ("${options.fileFormat}")`));
        correctArgumentsInTerminal.fileFormat = false;
      }
    } else {
      correctArgumentsInTerminal.fileFormat = false;
    }
  
    // file name
    if (options.fileName && options.fileName.length >= 1) {
      console.log('File name: ' + chalk.green(`${options.fileName}`));
      pom.fileName = options.fileName;
      correctArgumentsInTerminal.fileName = true;
    } else if (!options.fileName) {
      console.log('File name: ' + chalk.yellow(`no input, set to default ("${DEFAULT_FILE_NAME}")`));
      pom.fileName = DEFAULT_FILE_NAME;
      correctArgumentsInTerminal.fileName = true;
    } else {
      console.log('File name: ' + chalk.yellow(`no input, set to default ("${DEFAULT_FILE_NAME}")`));
      pom.fileName = DEFAULT_FILE_NAME;
      correctArgumentsInTerminal.fileName = true;
    }
  
    // output path
    if (options.outputPath && options.outputPath.length >= 1) {
      console.log('Output path: ' + `${options.outputPath}`);
      pom.outputPath = options.outputPath;
      correctArgumentsInTerminal.outputPath = true;
    } else if (!options.outputPath) {
      console.log('Output path: ' + chalk.yellow(`no input, set to default ("${DEFAULT_OUTPUT_PATH}")`));
      pom.outputPath = DEFAULT_OUTPUT_PATH;
      correctArgumentsInTerminal.outputPath = true;
    } else {
      console.log('Output path: ' + chalk.yellow(`no input, set to default ("${DEFAULT_OUTPUT_PATH}")`));
      pom.outputPath = DEFAULT_OUTPUT_PATH;
      correctArgumentsInTerminal.outputPath = true;
    }
  
    // debug
    if (options.debug) {
      console.log('\nFinal page object model: ', pom);
      console.log('\nCorrect arguments in terminal: ', correctArgumentsInTerminal);
    }
  
    // check if minimum of arguments are right set and then generate empty page in file format
    if (
      correctArgumentsInTerminal.unit === true &&
      correctArgumentsInTerminal.pageWidth === true &&
      correctArgumentsInTerminal.pageHeight === true &&
      correctArgumentsInTerminal.fileFormat === true
    ) {
      console.log(chalk.green('\nMinimum of arguments in terminal are correct.'));
      if (pom.fileFormat === file_formats_constants.docx || pom.unit === file_formats_constants.doc) {
        generateDocumentDocx(pom);
      }
      else if (pom.fileFormat === file_formats_constants.pdf) {
        generateDocumentPdf(pom);
      } else if (pom.fileFormat === file_formats_constants.png) {
        generateDocumentPng(pom);
      } else if (pom.fileFormat === file_formats_constants.jpeg || pom.fileFormat === file_formats_constants.jpg) {
        generateDocumentJpeg(pom);
      } else {
        console.log(chalk.red('No write format passed to start generating process for empty page.'));
      }
    } else {
      console.log(chalk.red('Minimum of arguments in terminal are not correct!'));
    }
  } else {
    console.log('The program is terminated because no input or an inappropriate input was made.');
  }
}

module.exports = {
  startTerminalMenu
};