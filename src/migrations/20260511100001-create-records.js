'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('records', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      block: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      block_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      village: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      village_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      constituency: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      constituency_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      district_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      state_search: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      language: {
        type: Sequelize.ENUM('HI', 'EN'),
        allowNull: false,
      },
      source: {
        type: Sequelize.ENUM('OPEN_LINK', 'ADMIN_PANEL'),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('records', ['name_search']);
    await queryInterface.addIndex('records', ['block_search']);
    await queryInterface.addIndex('records', ['village_search']);
    await queryInterface.addIndex('records', ['constituency_search']);
    await queryInterface.addIndex('records', ['district_search']);
    await queryInterface.addIndex('records', ['state_search']);
    await queryInterface.addIndex('records', ['language']);
    await queryInterface.addIndex('records', ['source']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('records');
  },
};
