const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { verifyToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidators');

router.post(
  '/register',
  validate(registerSchema),
  authController.register
);

router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

router.get(
  '/profile',
  verifyToken,
  authController.getProfile
);

router.post(
  '/logout',
  verifyToken,
  authController.logout
);

module.exports = router;