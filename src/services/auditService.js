const auditLogRepository = require('../repositories/auditLogRepository');

const logAction = async ({
  userId,
  action,
  entityType,
  entityId,
  metadata,
  ipAddress,
}) => auditLogRepository.create({
  user_id: userId || null,
  action,
  entity_type: entityType,
  entity_id: entityId || null,
  metadata: metadata || null,
  ip_address: ipAddress || null,
});

module.exports = {
  logAction,
};
