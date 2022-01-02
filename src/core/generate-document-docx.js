/**
 * @author Stefan Schultz (Software Schultz)
 * 
 * Generator for Word documents with file extension "docx".
 */
const docx = require('docx');

const generateDocumentDocx = function generateDocumentDocx(pageObjectModel) {
  if (pageObjectModel) {
    const doc = new docx.Document({
      background: {
        color: 'FFFFFF'
      },
      title: 'My Document',
      sections: [{
        size: {
          orientation: docx.PageOrientation.LANDSCAPE
        },
        children: [new docx.Paragraph('Hello World')]
      }]
    });
    
    docx.Packer.toBuffer(doc)
      .then(b64string => { // create Base 64 string
        console.log('docx Base64String:', b64string);
        // console.log('Document created successfully.');
        return b64string;
      })
      .then(buffer => { // write document
        /* fs.writeFile('myDocument.docx', buffer, null, () => {
          console.log('Document saved successfully.');
        }); */
        const filePath = path.join(pageObjectModel.outputPath, pageObjectModel.fileName + '.docx');
        fs.writeFile(filePath, buffer, null, () => {
          console.log(`\nEmpty page successful generated to "${filePath}".`);
        });
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  } else {
    console.log('\nProblem by generating empty page.');
  }
};

module.exports = {
  generateDocumentDocx
};