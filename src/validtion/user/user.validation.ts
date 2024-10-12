import Joi from 'joi';
import { IUser } from '../../Interface/user.interface';








// Define the validation SignupSchema for creating a user
const SignupSchema = Joi.object({
    // First name validation: must be between 2 and 30 characters
    firstName: Joi.string()
      .min(3) // Minimum length of 2 characters
      .max(30) // Maximum length of 30 characters
      .required() // First name is required
      .messages({
        'string.base': 'Invalid first name',
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name must be at most 30 characters',
        'any.required': 'First name is required',
      }),

    
      isCheckedTC: Joi.boolean()
      .valid(true) // Ensure the checkbox is checked (true)
      .required() // It must be checked
      .messages({
        'any.only': 'You must agree to the terms and conditions',
        'any.required': 'Terms and conditions agreement is required',
      }),
  
    // Last name validation: must be between 2 and 30 characters
    lastName: Joi.string()
      .min(2) // Minimum length of 2 characters
      .max(30) // Maximum length of 30 characters
      .required() // Last name is required
      .messages({
        'string.base': 'Invalid last name',
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name must be at most 30 characters',
        'any.required': 'Last name is required',
      }),
  
    // Email validation: must be a valid email format
    email: Joi.string()
      .email() // Check for valid email format
      .required() // Email is required
      .messages({
        'string.email': 'Invalid email',
        'any.required': 'Email is required',
      }),
  
    // Phone number validation: must be exactly 10 digits
    phone: Joi.string()
      .pattern(new RegExp('^[0-9]{10}$')) // Ensure phone number is 10 digits
      .required() // Phone is required
      .messages({
        'string.pattern.base': 'Phone must be 10 digits',
        'any.required': 'Phone is required',
      }),
  
    // Password validation: must contain at least one special character and be between 3-30 characters long
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{3,30}$'))
      .required() // Password is required
      .messages({
        'string.pattern.base': 'Password must contain at least one special character and be between 3-30 characters long',
        'any.required': 'Password is required',
      }),
  
    // Role validation: must be 'admin' or 'employee', defaulting to 'employee'
    role: Joi.string()
      .valid('admin', 'user') // Enum validation for role
      .default('user') // Default role is 'employee'
      .messages({
        'string.base': 'Invalid role',
        'any.required': 'Role is required',
      }),
    userRefferalId:Joi.string().min(5).max(30).required().messages({
    'string.base': 'Invalid last name',
    'string.min': 'User Refferal Id  must be at least 6 characters',
    'string.max': 'Userid  must be at most 20 characters',
    'any.required': 'Userid  is required',
  }),
    // Referral code validation: optional, must match specific format if provided
    referredBy: Joi.string()
      .optional() // Referral code is optional
      .default("")
      .messages({
        'string.pattern.base': 'Referral code must be a valid hash',
      }),
  });




//loginschema
const loginSchema = Joi.object({
    // Email validation for login
    email: Joi.string()
        .email() // Must be a valid email format
        .required() // Email is required
        .messages({
            'string.email': 'Invalid email',
            'any.required': 'Email is required',
        }),
    
    // Password validation for login
    password: Joi.string()
        .required() // Password is required
        .messages({
            'any.required': 'Password is required',
        }),
        
    
    // Role validation (only 'admin' and 'employee' allowed)
    role: Joi.string()
        .valid('admin', 'user') // Must be either 'admin' or 'employee'
        .required() // Role is required
        .messages({
            'any.only': 'Role must be either admin or employee',
            'any.required': 'Role is required',
        }),

    // Phone validation (must be a valid phone number
});










// Validate function for creating a user
export const validateUserSignupSchema = (userData:IUser) => {
    const { error, value } = SignupSchema.validate(userData); // Validate user data against the SignupSchema
    if (error) {
        return { isValid: false, message: error.details[0].message }; // Return error if validation fails
    }
    return { isValid: true, value }; // Return valid value if validation succeeds
};



// Validate function for logging in admin
export const validateUserLoginSchema = (userData:IUser) => {
    const { error, value } = loginSchema.validate(userData); // Validate login data against the SignupSchema
    if (error) {
        return { isValid: false, message: error.details[0].message }; // Return error if validation fails
    }
    return { isValid: true, value }; // Return valid value if validation succeeds
};
