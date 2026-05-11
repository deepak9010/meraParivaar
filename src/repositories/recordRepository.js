const { Op } = require('sequelize');
const { Record } = require('../models');
const { SEARCHABLE_FIELDS } = require('../helpers/searchNormalizer');

const create = (payload, options = {}) => Record.create(payload, options);

const findById = (id) => Record.findByPk(id);

const findByMobileNumber = (mobileNumber) => Record.findOne({
  where: { mobile_number: mobileNumber },
});

const findAll = ({ limit, offset, where = {} }) => Record.findAndCountAll({
  where,
  limit,
  offset,
  order: [['created_at', 'DESC']],
});

const updateById = (id, payload, options = {}) => Record.update(payload, {
  where: { id },
  ...options,
});

const deleteById = (id, options = {}) => Record.destroy({
  where: { id },
  ...options,
});

const search = ({ query, limit, offset }) => {
  const tokens = String(query)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const searchConditions = tokens.flatMap((token) => SEARCHABLE_FIELDS.map((field) => ({
    [`${field}_search`]: {
      [Op.like]: `%${token}%`,
    },
  })));

  return Record.findAndCountAll({
    where: {
      [Op.or]: searchConditions,
    },
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });
};

module.exports = {
  create,
  findById,
  findByMobileNumber,
  findAll,
  updateById,
  deleteById,
  search,
};
