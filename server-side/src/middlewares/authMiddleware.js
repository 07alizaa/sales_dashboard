const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const ResponseHandler = require('../utils/responseHandler');
const { AuthenticationError } = require('../utils/errorHandler');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided. Please login.');
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, jwtConfig.secret);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AuthenticationError('User not found. Token invalid.');
    }

    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return ResponseHandler.unauthorized(res, 'Invalid token');
    }
    
    if (error.name === 'TokenExpiredError') {
      return ResponseHandler.unauthorized(res, 'Token expired. Please login again.');
    }

    if (error instanceof AuthenticationError) {
      return ResponseHandler.unauthorized(res, error.message);
    }

    return ResponseHandler.error(res, 'Authentication failed', 401);
  }
};

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'Authentication required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ResponseHandler.error(
        res,
        'You do not have permission to perform this action',
        403
      );
    }

    next();
  };
};

module.exports = {
  verifyToken,
  verifyRole,
};