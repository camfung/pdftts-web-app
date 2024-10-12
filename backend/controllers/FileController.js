const multer = require("multer")
const path = require("path")

// Configure multer
const storage = multer.memoryStorage()
const acceptedFiles = [".pdf", ".txt"]
const fileFilter = (req, file, cb) => {
  console.log(file)
  const fileExt = path.extname(file.originalname);
  if (acceptedFiles.includes(fileExt)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only .txt and .pdf files are allowed.'), false);
  }
}
const upload = multer({ storage, fileFilter: fileFilter });

const fileUpload = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors (e.g. file size limit)
      return res.status(400).json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
      // Handle general errors (e.g. invalid file type)
      return res.status(400).json({ error: `Upload Error: ${err.message}` });
    }

    // If no error, proceed with the response
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const buf = req.file.buffer;
    res.json({ fileText: buf.toString() });
  });
};

module.exports = {
  fileUpload,
  upload,
};
