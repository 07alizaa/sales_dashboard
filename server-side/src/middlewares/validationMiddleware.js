const ResponseHandler = require('../utils/responseHandler');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));

      return ResponseHandler.validationError(res, errors);
    }

    req.body = value;
    next();
  };
};

module.exports = validate;