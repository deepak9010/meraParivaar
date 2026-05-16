const express = require('express');
const publicController = require('../controllers/publicController');
const asyncHandler = require('../middlewares/asyncHandler');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const ROLES = require('../constants/roles');
const {
  publicSubmitSchema,
  createPublicLinkSchema,
  publicFormTokenParamsSchema,
  publicLinkIdParamsSchema,
} = require('../validators/publicValidator');

const router = express.Router();

/**
 * @swagger
 * /public/form/{token}:
 *   get:
 *     tags: [Public]
 *     summary: Get public form metadata by token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Public form fetched successfully
 */
router.get('/form/:token', validate(publicFormTokenParamsSchema, 'params'), asyncHandler(publicController.getPublicForm));

/**
 * @swagger
 * /public/submit:
 *   post:
 *     tags: [Public]
 *     summary: Submit public form data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublicSubmitRequest'
 *     responses:
 *       201:
 *         description: Form submitted successfully
 */
router.post('/submit', validate(publicSubmitSchema), asyncHandler(publicController.submitPublicForm));

/**
 * @swagger
 * /public/links:
 *   post:
 *     tags: [Public]
 *     summary: Create a public form link
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublicLinkCreateRequest'
 *     responses:
 *       201:
 *         description: Public link created successfully
 */
router.post('/links', authenticate, authorize([ROLES.ADMIN]), validate(createPublicLinkSchema), asyncHandler(publicController.createPublicLink));

/**
 * @swagger
 * /public/links:
 *   get:
 *     tags: [Public]
 *     summary: List public form links
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Public links fetched successfully
 */
router.get('/links', authenticate, authorize([ROLES.ADMIN]), asyncHandler(publicController.getPublicLinks));

/**
 * @swagger
 * /public/links/{id}:
 *   delete:
 *     tags: [Public]
 *     summary: Delete a public form link
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Public link deleted successfully
 *       404:
 *         description: Public link not found
 */
router.delete('/links/:id', authenticate, authorize([ROLES.ADMIN]), validate(publicLinkIdParamsSchema, 'params'), asyncHandler(publicController.deletePublicLink));

module.exports = router;
