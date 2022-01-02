/**
 * @author Stefan Schultz (Software Schultz)
 * 
 * Page object model to hold states.
 */
let pageObjectModel = {
  unit: null, // null | 'mm' | 'in' | 'pt' | 'px' ==> mm==Millimeter, in==Inch/Zoll, pt==Point, px==Pixel
  pageWidth: null, // null | 1
  pageHeight: null, // null | 1
  // resolution: null, // null | 72 ==> 72 or 96 dpi/ppi
  pageOrientation: null, // null | 'p' | 'l' ==> p==portrait, l==landscape
  fileFormat: null, // null | 'pdf' | 'docx' | 'odt' | 'jpeg' | 'jpg' | 'png'
  fileName: null, // null | 'empty_page' ==> if nothing is set, then is default name set
  outputPath: null // null | './' ==> if nothing is set, then is default root path
};

const DEFAULT_UNIT = 'mm';
const DEFAULT_PAGE_WIDTH = 1;
const DEFAULT_PAGE_HEIGHT = 1;
const DEFAULT_PAGE_ORIENTATION = 'p';
const DEFAULT_PAGE_RESOLUTION = 72;
const DEFAULT_FILE_NAME = 'empty_page';
const DEFAULT_OUTPUT_PATH = './';

module.exports = {
 pageObjectModel,
 DEFAULT_UNIT,
 DEFAULT_PAGE_WIDTH,
 DEFAULT_PAGE_HEIGHT,
 DEFAULT_PAGE_ORIENTATION,
 DEFAULT_PAGE_RESOLUTION,
 DEFAULT_FILE_NAME,
 DEFAULT_OUTPUT_PATH
};