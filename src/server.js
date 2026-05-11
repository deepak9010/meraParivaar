require('./config/loadEnv');

const app = require('./app');
const config = require('./config');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established');

    app.listen(config.port, () => {
      logger.info('Server started', {
        port: config.port,
        env: config.env,
        docs: `http://localhost:${config.port}/api-docs`,
      });
    });
  } catch (error) {
    logger.error('Failed to start server', {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

startServer();
