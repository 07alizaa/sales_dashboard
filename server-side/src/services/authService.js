const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const jwtConfig = require('../config/jwt');
const {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} = require('../utils/errorHandler');
const Logger = require('../utils/logger');

class AuthService {
  async register(userData) {
    try {
      const { name, email, password, role } = userData;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ConflictError('Email already registered');
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'admin',
      });

      const token = this.generateToken(user._id);

      Logger.info(`New user registered: ${email}`);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      Logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = this.generateToken(user._id);

      Logger.info(`User logged in: ${email}`);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      Logger.error('Login error:', error);
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    } catch (error) {
      Logger.error('Get profile error:', error);
      throw error;
    }
  }

  generateToken(userId) {
    return jwt.sign(
      { userId },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }
}

module.exports = new AuthService();