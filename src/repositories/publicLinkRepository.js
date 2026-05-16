const { PublicLink } = require('../models');

const create = (payload, options = {}) => PublicLink.create(payload, options);

const findById = (id) => PublicLink.findByPk(id);

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

const deleteById = (id, options = {}) => PublicLink.destroy({
  where: { id },
  ...options,
});

module.exports = {
  create,
  findById,
  findByToken,
  findAll,
  updateById,
  deleteById,
};
