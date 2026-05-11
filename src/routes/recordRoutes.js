const express = require('express');
const recordController = require('../controllers/recordController');
const asyncHandler = require('../middlewares/asyncHandler');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const ROLES = require('../constants/roles');
const {
  createRecordSchema,
  updateRecordSchema,
  searchRecordsSchema,
  listRecordsSchema,
} = require('../validators/recordValidator');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ALL));

/**
 * @swagger
 * /records/search:
 *   get:
 *     tags: [Records]
 *     summary: Search records across Hindi and English normalized fields
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Search completed successfully
 */
router.get('/search', validate(searchRecordsSchema, 'query'), asyncHandler(recordController.searchRecords));

/**
 * @swagger
 * /records:
 *   get:
 *     tags: [Records]
 *     summary: List records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Records fetched successfully
 */
router.get('/', validate(listRecordsSchema, 'query'), asyncHandler(recordController.getRecords));

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     tags: [Records]
 *     summary: Get record by ID
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
 *         description: Record fetched successfully
 */
router.get('/:id', asyncHandler(recordController.getRecordById));

/**
 * @swagger
 * /records:
 *   post:
 *     tags: [Records]
 *     summary: Create a record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordInput'
 *     responses:
 *       201:
 *         description: Record created successfully
 */
router.post('/', authorize([ROLES.ADMIN]), validate(createRecordSchema), asyncHandler(recordController.createRecord));

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     tags: [Records]
 *     summary: Update a record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordUpdateInput'
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.put('/:id', authorize([ROLES.ADMIN]), validate(updateRecordSchema), asyncHandler(recordController.updateRecord));

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     tags: [Records]
 *     summary: Soft delete a record
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
 *         description: Record deleted successfully
 */
router.delete('/:id', authorize([ROLES.ADMIN]), asyncHandler(recordController.deleteRecord));

module.exports = router;
