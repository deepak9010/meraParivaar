const sequelize = require('../database/connection');
const User = require('./User');
const Record = require('./Record');
const PublicLink = require('./PublicLink');
const AuditLog = require('./AuditLog');

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

User.hasMany(AuditLog, {
  foreignKey: 'user_id',
  as: 'auditLogs',
});

AuditLog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

module.exports = {
  sequelize,
  User,
  Record,
  PublicLink,
  AuditLog,
};
