import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Set up multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

// POST /api/upload
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    res.status(200).send({
      message: 'File uploaded successfully',
      image: `/uploads/${req.file.filename}`,  // ✅ Correct! Use filename not path
    });
  });
});
export default router;
