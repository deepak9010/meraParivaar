const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const LANGUAGES = require('../constants/languages');
const SOURCES = require('../constants/sources');

const Record = sequelize.define('Record', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  block: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  block_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  village_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  constituency: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  constituency_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  district_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  state_search: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  language: {
    type: DataTypes.ENUM(...LANGUAGES.ALL),
    allowNull: false,
  },
  source: {
    type: DataTypes.ENUM(...SOURCES.ALL),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  tableName: 'records',
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Record;
