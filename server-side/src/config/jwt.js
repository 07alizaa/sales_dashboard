/**
 * JWT Configuration
 * Centralizes JWT settings for consistency across the app
 */

const jwtConfig = {
  // Secret key for signing tokens (from environment variable)
  secret: process.env.JWT_SECRET || 'fallback_secret_key_for_development',
  
  // Token expiration time
  expiresIn: process.env.JWT_EXPIRE || '7d',
  
  // Algorithm for signing
  algorithm: 'HS256',
};

module.exports = jwtConfig;