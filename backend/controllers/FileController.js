
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configurable allowed file types
const allowedFileTypes = ['.txt', '.pdf'];

// Multer setup to save files to the 'files' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'files');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname);
  if (allowedFileTypes.includes(fileExt)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only .txt and .pdf files are allowed.'), false); // Reject the file
  }
};

// Initialize multer with storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Express endpoint implementation
const getFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    res.status(200).send({ message: 'File uploaded successfully.' });
  });
};

module.exports = {
  getFile,
};
