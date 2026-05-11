const SEARCH_SUFFIX = '_search';

const toPublicRecord = (record) => {
  if (!record) {
    return null;
  }

  const plain = typeof record.toJSON === 'function' ? record.toJSON() : record;
  const sanitized = { ...plain };

  Object.keys(sanitized).forEach((key) => {
    if (key.endsWith(SEARCH_SUFFIX)) {
      delete sanitized[key];
    }
  });

  return sanitized;
};

const toPublicRecords = (records) => records.map(toPublicRecord);

module.exports = {
  toPublicRecord,
  toPublicRecords,
};
