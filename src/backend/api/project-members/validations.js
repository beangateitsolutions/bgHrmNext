let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

function getAdminProjectMembers(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      project: 'optional|mongoid',
      withProject: 'optional|string|boolean',
      employee: 'optional|mongoid',
      withEmployee: 'optional|string|boolean',
      intern: 'optional|mongoid',
      withIntern: 'optional|string|boolean',
      sortBy: 'optional|enums:createdAt',
      sortOrder: 'optional|enums:ascending,descending',
    };
    const { errors } = validate(rules, req.query);
    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function postAdminProjectMembers(req, res, next) {
  try {
    const rules = {
      project: 'mongoid',
      employee: 'optional|mongoid',
      intern: 'optional|mongoid',
      $atleast: 'employee|intern',
    };
    const { errors } = validate(rules, req.body);

    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }

    if(req.body.intern && req.body.employee) {
      return res.status(400).json({message: 'only one of employee/intern can be given at a time'})
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function deleteAdminProjectMembers(req, res, next) {
  try {
    const rules = {
      projectMemberId: 'mongoid',
    };
    const { errors } = validate(rules, req.params);

    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }
    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

function getProjectMembers(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      project: 'optional|mongoid',
      withProject: 'optional|string|boolean',
      withEmployee: 'optional|string|boolean',
      withIntern: 'optional|string|boolean',
      sortBy: 'optional|enums:createdAt',
      sortOrder: 'optional|enums:ascending,descending',
    };
    const { errors } = validate(rules, req.query);
    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

module.exports = {
  getAdminProjectMembers,
  postAdminProjectMembers,
  deleteAdminProjectMembers,
  getProjectMembers
};
