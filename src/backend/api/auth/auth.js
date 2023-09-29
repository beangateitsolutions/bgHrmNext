let jwt = require('jsonwebtoken');
let colors = require('../../utils/colors');
let { Admin, Employee } = require('../users/models');

async function authorizeEmployee(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    let email, hash;

    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);
      email = payload.email;
      hash = payload.hash;
    } catch (error) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'employee not found' });
    }

    if (employee.disabled) {
      return res.status(403).json({ message: 'disabled account' });
    }

    if (employee.password.slice(-10) !== hash) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    res.locals.employee = employee;

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function authorizeAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    let email, hash;

    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);
      email = payload.email;
      hash = payload.hash;
    } catch (error) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    if (admin.password.slice(-10) !== hash) {
      return res.status(401).json({ message: 'authorization failed' });
    }

    res.locals.admin = admin;

    return next();
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

const auth = {
  authorizeEmployee,
  authorizeAdmin,
};

module.exports = auth;
