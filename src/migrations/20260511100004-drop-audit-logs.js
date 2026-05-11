'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS audit_logs');
  },

  async down() {
    // Audit logging is intentionally not part of the application schema.
  },
};
