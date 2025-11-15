const multer = require('multer');
const path = require('path');

/**
 * Multer Configuration for File Uploads
 * Handles Excel file uploads with validation
 */

// Configure storage
const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  
  // Generate unique filename
  filename: function (req, file, cb) {
    // Format: excel-1234567890-originalname.xlsx
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'excel-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter - only allow Excel files
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const allowedExtensions = ['.xlsx', '.xls'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Allowed MIME types
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ];
  
  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(new Error('Only Excel files (.xlsx, .xls) are allowed!'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  }
});

module.exports = upload;