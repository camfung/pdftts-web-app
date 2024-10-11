const fs = require('fs');
const path = require('path');
const multer = require("multer")

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp for unique filenames
  },
});
const upload = multer({ storage });

const fileUpload = (req, res) => {
  console.log(req.file)
  res.send(`File uploaded successfully`);
};

// Define a POST route for multiple file uploads

const bultFileUpload = (req, res) => {
  const fileNames = req.files.map(file => file.filename);
  res.send(`Files uploaded: ${fileNames.join(', ')}`);
};

module.exports = {
  fileUpload,
  upload,
};
