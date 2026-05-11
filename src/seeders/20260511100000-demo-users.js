'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash('Admin@123', 12);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'System Admin',
        email: 'admin@example.com',
        password,
        role: 'ADMIN',
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: 'Read Only User',
        email: 'user@example.com',
        password,
        role: 'USER',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@example.com', 'user@example.com'],
    });
  },
};
