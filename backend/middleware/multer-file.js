const multer = require('multer');

// Initialisation des extensions :
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'video/mp4': 'mp4'
};


// Configuration de Multer :
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'files');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('file');