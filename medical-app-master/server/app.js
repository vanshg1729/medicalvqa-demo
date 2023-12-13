// server/app.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5001;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/uploads/';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imagePath: `uploads/${req.file.filename}` });
});

// Serve static files
app.use('/uploads', express.static('public/uploads'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
