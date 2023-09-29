let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

async function postAdminEmployee(req, res, next) {
  try {
    const rules = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      gender: 'enums:male,female',
      password: 'string|min:3',
    };
    const { errors } = validate(rules, req.body);
    console.log(errors);
    const image = req.files?.image?.[0];

    if (errors) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }

    if (!image) {
      return res.status(400).json({ message: 'image is required' });
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

function deleteAdminEmployee(req, res, next) {
  try {
    const rules = {
      disabledReason: 'string|min:3',
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

async function patchAdminEmployee(req, res, next) {
  try {
    let rules = {
      name: 'optional|name',
      email: 'optional|email',
      phone: 'optional|phone',
      password: 'optional|string|min:3',
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

function getEmployee(req, res, next) {
  try {
    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchEmployee(req, res, next) {
  try {
    const rules = {
      password: 'optional|string|min:3',
    };
    const { errors } = validate(rules, req.body);

    if (errors) {
      const image = req.files.image?.[0];
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }
    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

function getAdminEmployees(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      employeeId: 'optional|string|natural',
      name: 'optional|name',
      email: 'optional|email',
      gender: 'optional|enums:male,female',
      disabled: 'optional|boolean',
      sortBy:
        'optional|enums:employeeId,name,email,createdAt,updatedAt,lastLogin,lastLogout',
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

function getAdminClients(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      _id: 'optional|string|mongoid',
      name: 'optional|name',
      email: 'optional|email',
      gender: 'optional|enums:male,female',
      phone: 'optional|phone',
      sortBy: 'optional|enums:name,createdAt',
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
function getAdminClient(req, res, next) {
  return next();
}

function getAdminInterns(req, res, next) {
  try {
    let rules = {
      limit: 'optional|string|natural',
      page: 'optional|string|natural',
      _id: 'optional|mongoid',
      name: 'optional|name',
      email: 'optional|email',
      gender: 'optional|enums:male,female',
      phone: 'optional|phone',
      sortBy: 'optional|enums:name,createdAt,endAt,updatedAt',
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
function getAdminIntern(req, res, next) {
  return next();
}

async function postAdminClient(req, res, next) {
  try {
    const rules = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      gender: 'enums:male,female',
    };
    const { errors } = validate(rules, req.body);

    const image = req.files.image?.[0];
    if (errors) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}
async function patchAdminClient(req, res, next) {
  try {
    const rules = {
      name: 'optional|name',
      phone: 'optional|phone',
      email: 'optional|email',
      gender: 'optional|enums:male,female',
      password: 'optional|string|min:3',
    };
    const { errors } = validate(rules, req.body);
    const image = req.files?.image?.[0];
    if (errors) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}
async function deleteAdminClient(req, res, next) {
  return next();
}

async function postAdminIntern(req, res, next) {
  try {
    const rules = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      gender: 'enums:male,female',
    };
    const { errors } = validate(rules, req.body);

    const image = req.files.image?.[0];
    if (errors) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }

    if (!image) {
      return res.status(400).json({ message: 'image is required' });
    }
    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}
async function patchAdminIntern(req, res, next) {
  try {
    const rules = {
      name: 'optional|name',
      phone: 'optional|phone',
      email: 'optional|email',
      gender: 'optional|enums:male,female',
      password: 'optional|string|min:3',
    };
    const { errors } = validate(rules, req.body);

    const image = req.files?.image?.[0];
    if (errors) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(400).json({ message: errors[0] });
    }

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}
async function deleteAdminIntern(req, res, next) {
  return next();
}

module.exports = {
  postAdminEmployee,
  deleteAdminEmployee,
  patchAdminEmployee,
  getEmployee,
  patchEmployee,
  getAdminEmployees,
  postAdminClient,
  patchAdminClient,
  deleteAdminClient,
  postAdminIntern,
  deleteAdminIntern,
  patchAdminIntern,
  getAdminClients,
  getAdminClient,
  getAdminInterns,
  getAdminIntern,
};
