const sequelize = require('../database/connection');
const User = require('./User');
const Record = require('./Record');
const PublicLink = require('./PublicLink');

User.hasMany(Record, {
  foreignKey: 'created_by',
  as: 'records',
});

Record.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

User.hasMany(PublicLink, {
  foreignKey: 'created_by',
  as: 'publicLinks',
});

PublicLink.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

module.exports = {
  sequelize,
  User,
  Record,
  PublicLink,
};
