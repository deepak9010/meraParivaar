const swaggerJsdoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Mera Parivaar API',
      version: '1.0.0',
      description: 'Multilingual public data collection backend API',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SignupRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Admin User' },
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            password: { type: 'string', format: 'password', example: 'Admin@123' },
            role: { type: 'string', enum: ['ADMIN', 'USER'], example: 'ADMIN' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            password: { type: 'string', format: 'password', example: 'Admin@123' },
          },
        },
        RecordInput: {
          type: 'object',
          required: ['name', 'block', 'village', 'constituency', 'district', 'state', 'mobile_number', 'language'],
          properties: {
            name: { type: 'string', example: 'Rahul Sharma' },
            block: { type: 'string', example: 'Block A' },
            village: { type: 'string', example: 'Delhi' },
            constituency: { type: 'string', example: 'Constituency 1' },
            district: { type: 'string', example: 'Central Delhi' },
            state: { type: 'string', example: 'Delhi' },
            mobile_number: { type: 'string', example: '9876543210' },
            language: { type: 'string', enum: ['HI', 'EN'], example: 'EN' },
          },
        },
        RecordUpdateInput: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            block: { type: 'string' },
            village: { type: 'string' },
            constituency: { type: 'string' },
            district: { type: 'string' },
            state: { type: 'string' },
            mobile_number: { type: 'string' },
            language: { type: 'string', enum: ['HI', 'EN'] },
          },
        },
        PublicSubmitRequest: {
          allOf: [
            { $ref: '#/components/schemas/RecordInput' },
            {
              type: 'object',
              required: ['token'],
              properties: {
                token: {
                  type: 'string',
                  example: 'f3c2d1a0b9e8f7c6d5b4a392817061504f3e2d1c0b9a8f7e6d5c4b3a29180',
                },
              },
            },
          ],
        },
        PublicLinkCreateRequest: {
          type: 'object',
          properties: {
            expires_at: {
              type: 'string',
              format: 'date-time',
              example: '2026-12-31T23:59:59.000Z',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
            statusCode: { type: 'integer', example: 200 },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
            statusCode: { type: 'integer', example: 400 },
          },
        },
      },
    },
  },
  apis: [
    `${__dirname}/../routes/*.js`,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
