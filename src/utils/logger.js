const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return `${timestamp} ${level}: ${stack || message}${metaString}`;
    })
  ),
  defaultMeta: {
    service: config.appName,
  },
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
