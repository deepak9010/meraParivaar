const { User } = require('../models');

const create = (payload, options = {}) => User.create(payload, options);

const findByEmail = (email) => User.findOne({ where: { email } });

const findByMobileNumber = (mobileNumber) => User.findOne({ where: { mobile_number: mobileNumber } });

const findById = (id) => User.findByPk(id);

module.exports = {
  create,
  findByEmail,
  findByMobileNumber,
  findById,
};
