const { PublicLink } = require('../models');

const create = (payload, options = {}) => PublicLink.create(payload, options);

const findByToken = (token) => PublicLink.findOne({ where: { token } });

const findAll = ({ limit, offset }) => PublicLink.findAndCountAll({
  limit,
  offset,
  order: [['created_at', 'DESC']],
});

const updateById = (id, payload, options = {}) => PublicLink.update(payload, {
  where: { id },
  ...options,
});

module.exports = {
  create,
  findByToken,
  findAll,
  updateById,
};
