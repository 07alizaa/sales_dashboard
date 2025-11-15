const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadControllers');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

router.use(verifyToken);

router.post(
  '/',
  upload.single('file'),
  uploadController.uploadExcel
);

router.get('/template', uploadController.downloadTemplate);

module.exports = router;