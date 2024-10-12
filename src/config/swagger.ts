import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';

// Define the swagger definition object with proper typing
const swaggerDefinition: OAS3Options['swaggerDefinition'] = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'My API Description',
  },
};

// Swagger options with defined types
const options: OAS3Options = {
  swaggerDefinition,
  apis: ['./routes/auth.routes.ts'], // Ensure the path is correct
};

// Generate the swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Export the swagger specification
export default swaggerSpec;
