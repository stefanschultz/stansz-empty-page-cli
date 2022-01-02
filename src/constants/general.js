const general_constants = Object.freeze({
  programName: 'Empty Page CLI (Schultz Software)',
  programVersion: '0.0.1'
});

const units_constants = Object.freeze({
  mm: 'mm', // Millimeter
  in: 'in', // Inch
  px: 'px' // Pixel
});

const file_formats_constants = Object.freeze({
  'docx': 'docx',
  'doc': 'doc',
  'pdf': 'pdf',
  'png': 'png',
  'jpeg': 'jpeg',
  'jpg': 'jpg'
});

const page_orientation_constants = Object.freeze({
  portrait: 'portrait',
  landscape: 'landscape'
});

const page_orientation_constants_shortcut = Object.freeze({
  portrait: 'p',
  landscape: 'l'
});

module.exports = {
  general_constants,
  units_constants,
  file_formats_constants,
  page_orientation_constants,
  page_orientation_constants_shortcut
};