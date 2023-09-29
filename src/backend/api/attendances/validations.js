let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

async function getAdminAttendances(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|number|natural',
      page: 'optional|string|number|natural',
      employee: 'optional|mongoid',
      start: 'optional|dateonly',
      end: 'optional|dateonly',
      withEmployee: 'optional|string|boolean',
      sortBy: 'optional|enums:start,end,createdOn',
      sortOrder: 'optional|enums:ascending,descending',
    };

    const { errors } = validate(rules, req.query);
    console.log(errors);
    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: 'server error' });
  }
}

async function getAttendances(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|number|natural',
      page: 'optional|string|number|natural',
      start: 'optional|dateonly',
      end: 'optional|dateonly',
      sortBy: 'optional|enums:start,end,createdOn',
      sortOrder: 'optional|enums:ascending,descending',
    };

    const { errors } = validate(rules, req.query);
    console.log(errors);
    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: 'server error' });
  }
}

async function postAttendance(req, res, next) {
  return next();
}

async function patchAttendance(req, res, next) {
  return next();
}

module.exports = {
  getAdminAttendances,
  getAttendances,
  postAttendance,
  patchAttendance,
};
