const multer = require("multer")

// Configure multer
const storage = multer.memoryStorage()
const upload = multer({ storage });

const fileUpload = (req, res) => {
  console.log(req.file)
  const buf = req.file.buffer;
  res.json({ fileText: buf.toString() });
};

module.exports = {
  fileUpload,
  upload,
};
