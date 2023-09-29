let { Employee, Admin } = require('../users/models');
let helpers = require('../../utils/helpers');

async function employeeLogin(req, res) {
  try {
    const { email, password, remember } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'employee not found' });
    }

    if (employee.disabled) {
      return res.status(403).json({ message: 'disabled account' });
    }

    const passwordHash = helpers.getHash(password);

    if (employee.password !== passwordHash) {
      return res.status(401).json({ message: 'authentication failed' });
    }

    const token = helpers.getToken(email, passwordHash, remember);

    employee.lastLogin = new Date();
    await employee.save();

    return res
      .status(200)
      .json({ token, message: 'authentication successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function employeeLogout(req, res) {
  try {
    let employee = res.locals.employee;
    employee.lastLogout = new Date();
    await employee.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    const passwordHash = helpers.getHash(password);

    if (admin.password !== passwordHash) {
      return res.status(401).json({ message: 'authentication failed' });
    }

    const token = helpers.getAdminToken(email, passwordHash, true);
    return res
      .status(200)
      .json({ token, message: 'authentication successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

module.exports = {
  adminLogin,
  employeeLogin,
  employeeLogout
};
