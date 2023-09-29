let { validate } = require('super-easy-validator');

function employeeLogin(req, res, next) {
  try {
    const { errors } = validate(
      {
        email: 'email',
        password: 'string|min:3',
        remember: 'optional|boolean',
      },
      req.body
    );
    if (errors) {
      return res.status(400).json({ message: errors[0] });
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

function adminLogin(req, res, next) {
  try {
    const { errors } = validate(
      {
        email: 'email',
        password: 'string|min:3',
        remember: 'optional|boolean',
      },
      req.body
    );
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
  employeeLogin,
  adminLogin,
};
