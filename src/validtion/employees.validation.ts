// import Joi from 'joi';
// import { IEmployee } from '../Interface/employees';

// // Joi schema for Employee with custom messages
// export const employeeSchema = Joi.object({
//     employeeName: Joi.string()
//         .min(3)
//         .max(50)
//         .required()
//         .messages({
//             'string.base': '"employeeName" should be a type of \'text\'',
//             'string.empty': '"employeeName" cannot be an empty field',
//             'string.min': '"employeeName" should have a minimum length of {#limit}',
//             'string.max': '"employeeName" should have a maximum length of {#limit}',
//             'any.required': '"employeeName" is a required field'
//         }),
    
//     email: Joi.string()
//         .email()
//         .required()
//         .messages({
//             'string.base': '"email" should be a type of \'text\'',
//             'string.empty': '"email" cannot be an empty field',
//             'string.email': '"email" must be a valid email',
//             'any.required': '"email" is a required field'
//         }),
    
//     phone: Joi.string()
//         .pattern(/^[0-9]{10}$/)
//         .required()
//         .messages({
//             'string.base': '"phone" should be a type of \'text\'',
//             'string.empty': '"phone" cannot be an empty field',
//             'string.pattern.base': '"phone" must be a 10-digit number',
//             'any.required': '"phone" is a required field'
//         }),
    
//     specialization: Joi.string()
//         .required()
//         .messages({
//             'string.base': '"specialization" should be a type of \'text\'',
//             'string.empty': '"specialization" cannot be an empty field',
//             'any.required': '"specialization" is a required field'
//         }),
// });




// export const validateCreateEmployeeSchema= (userData:IEmployee) => {
//     const { error, value } = employeeSchema.validate(userData);
//     if (error) {
//         return { isValid: false, message: error.details[0].message };
//     }
//     return { isValid: true, value };
// };

