require('./loadEnv');

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
  env: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'meraParivaar',
  port: toNumber(process.env.PORT, 3000),
  jwt: {
    secret: process.env.JWT_SECRET || 'development-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  rateLimit: {
    windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toNumber(process.env.RATE_LIMIT_MAX, 100),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  publicForm: {
    baseUrl: process.env.PUBLIC_FORM_BASE_URL || 'http://localhost:3000/public/form',
  },
};

module.exports = config;
