import multer from 'multer';
import path from 'path';

// Tell multer WHERE to save the file and WHAT to name it
const storage = multer.diskStorage({

  // Save files in the uploads folder
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // Name the file with current time + original name
  // Example: 1234567890-myresume.pdf
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }

});

// Only allow PDF files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);  // accept the file
  } else {
    cb(new Error('Please upload a PDF file only'), false);  // reject it
  }
};

// Create the multer upload handler
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // max 5MB
  }
});