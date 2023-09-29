let { Report } = require('./models');
let helpers = require('../../utils/helpers');

async function getAdminReports(req, res) {
  try {
    let {
      limit,
      page,
      message,
      employee,
      withEmployee,
      status,
      sortBy,
      sortOrder,
    } = req.query;

    limit = limit ? +limit : 10;
    page = page ? +page : 1;
    withEmployee = withEmployee === 'true';

    if (!sortBy) {
      sortBy = 'createdAt';
    }

    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};

    if (employee) {
      match.employee = employee;
    }

    if (message) {
      match.message = { $regex: RegExp(message, 'i') }
    }

    if (status) {
      match.status = status;
    }

    let query = Report.find(match)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit)

    if (withEmployee) {
      query.populate('employee');
    }

    let reports = await query;
    reports.forEach(report => report.files = report.files.map(f => helpers.getS3FileUrl(f)))
    let count = await Report.find(match).countDocuments();

    return res.json({ reports, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
  }
}

async function getAdminReport(req, res) {
  try {
    let { reportId } = req.params;

    let report = await Report.findById(reportId).populate('employee');
    if (!report) {
      return res.status(404).json({ message: 'report not found' });
    }

    report.files = report.files.map(f => helpers.getS3FileUrl(f))

    return res.json({ report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
  }
}

async function patchAdminReport(req, res) {
  try {
    let { status } = req.body;
    let { reportId } = req.params;

    let report = await Report.findById(reportId);
    if(!report) {
      return res.status(404).json({message: 'report not found'})
    }

    if(report.status === 'resolved') {
      return res.status(409).json({message: 'report is already resolved'})
    }

    report.status = status;
    await report.save();

    res.json({ message: 'report updated successfully' });
  } catch (error) {
    console.log(error);
  }
}

async function getReports(req, res) {
  try {
    let { limit, page, message, status, sortBy, sortOrder } = req.query;

    limit = limit ? +limit : 10;
    page = page ? +page : 1;

    if (!sortBy) {
      sortBy = 'createdAt';
    }

    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {employee: res.locals.employee};

    if (message) {
      match.message = { $regex: RegExp(message, 'i') };
    }
    if (status) {
      match.status = status;
    }

    let query = Report.find(match)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit)

    let reports = await query;
    reports.forEach(report => report.files = report.files.map(f => helpers.getS3FileUrl(f)))
    let count = await Report.find(match).countDocuments();

    return res.json({ reports, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getReport(req, res) {
  try {
    let { reportId } = req.params;

    let report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).status({ message: 'report not found' });
    }

    report.files = report.files.map(f => helpers.getS3FileUrl(f))

    res.json({ report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
  }
}

async function postReport(req, res) {
  let { message } = req.body;
  const files = req.files?.files;
  let employee = res.locals.employee;

  let report = new Report({
    message,
    employee: employee._id,
    status: 'pending',
  });
  await report.save();

  if (files) {
    let array = [];
    for (let file of files) {
      let url = `uploads/reports/${report._id}/${file.originalname}`;
      await helpers.uploadFile(file, url);
      await helpers.deleteFile(file);
      array.push(url);
    }
    report.files = array;
    await report.save();
    report.files = report.files.map((e) => helpers.getS3FileUrl(e));
  }

  return res.status(201).json({ report });
}

module.exports = {
  getAdminReports,
  getAdminReport,
  patchAdminReport,
  getReports,
  getReport,
  postReport,
};
