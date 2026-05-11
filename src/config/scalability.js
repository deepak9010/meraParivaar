const toBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

module.exports = {
  redis: {
    enabled: toBoolean(process.env.REDIS_ENABLED, false),
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  },
  elasticsearch: {
    enabled: toBoolean(process.env.ELASTICSEARCH_ENABLED, false),
    node: process.env.ELASTICSEARCH_NODE || 'http://127.0.0.1:9200',
    indexPrefix: process.env.ELASTICSEARCH_INDEX_PREFIX || 'mera_parivaar',
  },
  queue: {
    enabled: toBoolean(process.env.QUEUE_ENABLED, false),
    url: process.env.QUEUE_URL || 'redis://127.0.0.1:6379',
  },
};
