const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../../.env');
const result = dotenv.config({ path: envPath });

if (result.error && result.error.code !== 'ENOENT') {
  throw result.error;
}

if (!fs.existsSync(envPath)) {
  throw new Error(`Missing .env file at ${envPath}. Copy .env.example and set your database credentials.`);
}

if (!process.env.DB_USER) {
  throw new Error('DB_USER is not set. Save your .env file and confirm DB_USER is defined.');
}

module.exports = {
  envPath,
};
