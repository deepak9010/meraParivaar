const { AuditLog } = require('../models');

const create = (payload, options = {}) => AuditLog.create(payload, options);

module.exports = {
  create,
};
