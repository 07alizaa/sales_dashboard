const Joi = require('joi');

const createSaleSchema = Joi.object({
  productName: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Product name is required',
      'string.max': 'Product name cannot exceed 100 characters',
    }),
  
  category: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Category is required',
      'string.max': 'Category cannot exceed 50 characters',
    }),
  
  quantitySold: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Quantity sold must be a number',
      'number.min': 'Quantity sold cannot be negative',
      'any.required': 'Quantity sold is required',
    }),
  
  revenue: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Revenue must be a number',
      'number.min': 'Revenue cannot be negative',
      'any.required': 'Revenue is required',
    }),
  
  salesDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Sales date must be a valid date',
      'any.required': 'Sales date is required',
    }),
});

const updateSaleSchema = Joi.object({
  productName: Joi.string()
    .max(100)
    .messages({
      'string.max': 'Product name cannot exceed 100 characters',
    }),
  
  category: Joi.string()
    .max(50)
    .messages({
      'string.max': 'Category cannot exceed 50 characters',
    }),
  
  quantitySold: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Quantity sold must be a number',
      'number.min': 'Quantity sold cannot be negative',
    }),
  
  revenue: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Revenue must be a number',
      'number.min': 'Revenue cannot be negative',
    }),
  
  salesDate: Joi.date()
    .messages({
      'date.base': 'Sales date must be a valid date',
    }),
}).min(1);

module.exports = {
  createSaleSchema,
  updateSaleSchema,
};