const express = require('express');
const authController = require('../controllers/authController');
const asyncHandler = require('../middlewares/asyncHandler');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const { signupSchema, loginSchema } = require('../validators/authValidator');

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register an internal dashboard user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/signup', validate(signupSchema), asyncHandler(authController.signup));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email or mobile number and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), asyncHandler(authController.login));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get authenticated user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get('/me', authenticate, asyncHandler(authController.getProfile));

module.exports = router;
