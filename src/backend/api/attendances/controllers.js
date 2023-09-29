let { Attendance } = require('./models');
let helpers = require('../../utils/helpers');
let colors = require('../../utils/colors');

async function getAdminAttendances(req, res) {
  try {
    let { limit, page, employee, start, end, withEmployee, sortBy, sortOrder } =
      req.query;
    limit = !limit ? 10 : +limit;
    page = !page ? 1 : +page;

    if (start) {
      start = new Date(start);
    }

    if (end) {
      end = new Date(end);
    }

    withEmployee = withEmployee === 'true';

    if (!sortBy) {
      sortBy = 'createdOn';
    }

    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};
    if (employee) {
      match.employee = employee;
    }
    if (start) {
      match.start = { $gte: start };
    }
    if (end) {
      match.end = { $lte: end };
    }

    let query = Attendance.find(match)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

    if (withEmployee) {
      query.populate('employee');
    }

    let attendances = await query;
    let count = await Attendance.find(match).countDocuments();
    return res.json({ attendances, count });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: 'server error' });
  }
}

async function getAttendances(req, res) {
  try {
    let { limit, page, start, end, sortBy, sortOrder } =
      req.query;
    limit = !limit ? 10 : +limit;
    page = !page ? 1 : +page;

    if (start) {
      start = new Date(start);
    }

    if (end) {
      end = new Date(end);
    }

    if (!sortBy) {
      sortBy = 'createdOn';
    }

    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};
    if (start) {
      match.start = { $gte: start };
    }
    if (end) {
      match.end = { $lte: end };
    }

    let query = Attendance.find(match)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

    let attendances = await query;
    let count = await Attendance.find(match).countDocuments();
    return res.json({ attendances, count });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: 'server error' });
  }
}

async function postAttendance(req, res) {
  try {
    let employee = res.locals.employee;
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let attendance = await Attendance.findOne({
      employee: employee._id,
      createdOn: today,
    });
    if (attendance) {
      return res
        .status(409)
        .json({ message: 'attendance already exist for today' });
    }

    attendance = new Attendance({
      employee: employee._id,
    });
    await attendance.save();
    return res.status(201).json({ attendance });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchAttendance(req, res) {
  try {
    let employee = res.locals.employee;
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let attendance = await Attendance.findOne({
      employee: employee._id,
      createdOn: today,
    });
    if (!attendance) {
      return res.status(404).json({ message: 'attendance not found' });
    }
    if (attendance.end) {
      return res.status(409).json({ message: 'attendance already completed' });
    }
    attendance.end = new Date();
    await attendance.save();
    return res
      .status(201)
      .json({ message: 'attendance completed successfully' });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

module.exports = {
  getAdminAttendances,
  getAttendances,
  postAttendance,
  patchAttendance,
};
