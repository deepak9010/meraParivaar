const express = require('express');
const authRoutes = require('./authRoutes');
const recordRoutes = require('./recordRoutes');
const publicRoutes = require('./publicRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    statusCode: 200,
  });
});

router.use('/auth', authRoutes);
router.use('/records', recordRoutes);
router.use('/public', publicRoutes);

module.exports = router;
