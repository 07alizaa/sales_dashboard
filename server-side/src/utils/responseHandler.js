/**
 * Standard Response Handler
 * Creates consistent API responses across the application
 */

class ResponseHandler {
  /**
   * Send success response
   */
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send error response
   */
  static error(res, message = 'Something went wrong', statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send validation error response
   */
  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  /**
   * Send not found response
   */
  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  /**
   * Send unauthorized response
   */
  static unauthorized(res, message = 'Unauthorized access') {
    return res.status(401).json({
      success: false,
      message,
    });
  }
}

module.exports = ResponseHandler;