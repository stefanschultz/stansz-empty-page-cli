/**
 * @author Stefan Schultz (Software Schultz)
 * 
 * Generator for PDF documents with file extension "pdf".
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { calculateWidthOrHeightByPointUnit } = require('./unit-converter-utility');

const generateDocumentPdf = function generateDocumentPdf(pageObjectModel) {
  if (pageObjectModel) {
    // Create a document.
    const doc = new PDFDocument({
      autoFirstPage: false
    });
  
    // stream: write to PDF
    const filePath = path.join(pageObjectModel.outputPath, pageObjectModel.fileName + '.pdf');
    doc.pipe(fs.createWriteStream(filePath));
    
    // add stuff to PDF here using methods described below...
    let width = calculateWidthOrHeightByPointUnit(pageObjectModel.unit, pageObjectModel.pageWidth);
    let height = calculateWidthOrHeightByPointUnit(pageObjectModel.unit, pageObjectModel.pageHeight);
    doc.addPage({
      layout: pageObjectModel.pageOrientation, // landscape, portrait
      size: [width, height] // [width, height]
    });
  
    // finalize the PDF and end the stream
    doc.end();

    console.log(`\nEmpty page successful generated to "${filePath}".`);
  } else {
    console.log('\nProblem by generating empty page.');
  }
};

module.exports = {
  generateDocumentPdf
};