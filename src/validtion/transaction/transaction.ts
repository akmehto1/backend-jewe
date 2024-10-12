const Joi = require('joi');

// Joi validation schema for Transaction
const transactionValidationSchema = Joi.object({
  member_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .required()
    .messages({
      'string.pattern.base': 'member_id must be a valid ObjectId.',
      'any.required': 'member_id is required.'
    }),
   purchased: Joi.number()
    .required()
    .messages({
      'number.base': 'total must be a number.',
      'any.required': 'total is required.'
    }),
});

// Export the validation schema
module.exports = transactionValidationSchema;
