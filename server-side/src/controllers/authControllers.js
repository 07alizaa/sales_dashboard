const authService = require('../services/authService');
const ResponseHandler = require('../utils/responseHandler');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      return ResponseHandler.success(
        res,
        result,
        'User registered successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      return ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const profile = await authService.getProfile(userId);

      return ResponseHandler.success(res, profile, 'Profile retrieved');
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return ResponseHandler.success(
        res,
        null,
        'Logout successful'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();