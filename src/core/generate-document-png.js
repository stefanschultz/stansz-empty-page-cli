/**
 * @author Stefan Schultz (Software Schultz)
 * 
 * Generator for PNG (images) documents with file extension "png".
 */
const fs = require('fs');
const path = require('path');
const pngjs = require('pngjs');
const { createCanvas } = require('canvas');
const { page_orientation_constants_shortcut } = require('../constants/general');

const generateDocumentPng = function generateDocumentPng(pageObjectModel) {
  if (pageObjectModel) {
    const width = (pageObjectModel.pageOrientation === page_orientation_constants_shortcut.portrait ? pageObjectModel.pageWidth : pageObjectModel.pageHeight);
    const height = (pageObjectModel.pageOrientation === page_orientation_constants_shortcut.portrait ? pageObjectModel.pageHeight : pageObjectModel.pageWidth);

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // context.fillStyle = 'rgba(255, 255, 255, 1.0)'; // white color
    context.fillStyle = '#ffffff'; // white color
    context.fillRect(0, 0, width, height);

    const buffer = canvas.toBuffer('image/png');
    const filePath = path.join(pageObjectModel.outputPath, pageObjectModel.fileName + '.png');
    fs.writeFileSync(filePath, buffer);

    console.log(`\nEmpty page successful generated to "${filePath}".`);
  } else {
    console.log('\nProblem by generating empty page.');
  }
};

module.exports = {
  generateDocumentPng
};