let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

function getAdminProjects(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      _id: 'optional|string|mongoid',
      key: 'optional|string|min:3',
      client: 'optional|mongoid',
      withClient: 'optional|string|boolean',
      status: 'optional|enums:pending,completed,cancelled',
      sortBy: 'optional|enums:duration,createdAt,completedAt,cancelledAt',
      sortOrder: 'optional|enums:ascending,descending',
    };
    const { errors } = validate(rules, req.query);
    if (errors) {
      console.log(errors);
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

function getAdminProject(req, res, next) {
  return next();
}

async function postAdminProject(req, res, next) {
  try {
    const rules = {
      title: 'string|min:3',
      description: 'string|min:10',
      client: 'optional|mongoid',
      duration: 'string|natural',
    };
    const { errors } = validate(rules, req.body);

    if (errors) {
      if(req.files?.files) {
        for(let file of req.files.files) {
          await helpers.deleteFile(file);
        }
      }
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchAdminProject(req, res, next) {
  try {
    const rules = {
      title: 'optional|string|min:3',
      description: 'optional|string|min:3',
      duration: 'optional|natural',
      status: 'optional|enums:completed,cancelled',
    };
    const { errors } = validate(rules, req.body);

    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }
    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getProjects(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      _id: 'optional|string|mongoid',
      key: 'optional|string|min:3',
      withClient: 'optional|string|boolean',
      status: 'optional|enums:pending,completed,cancelled',
      sortBy: 'optional|enums:duration,createdAt,completedAt,cancelledAt',
      sortOrder: 'optional|enums:ascending,descending',
    };
    const { errors } = validate(rules, req.query);
    if (errors) {
      console.log(errors);
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getProject(req, res, next) {
  return next();
}

module.exports = {
  getAdminProjects,
  getAdminProject,
  postAdminProject,
  patchAdminProject,
  getProjects,
  getProject,
};
