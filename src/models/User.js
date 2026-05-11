const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const ROLES = require('../constants/roles');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(191),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...ROLES.ALL),
    allowNull: false,
    defaultValue: ROLES.USER,
  },
}, {
  tableName: 'users',
  paranoid: false,
});

module.exports = User;
