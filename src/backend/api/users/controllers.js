let { Employee, Client, Intern, Misc } = require('./models');
let helpers = require('../../utils/helpers');
let colors = require('../../utils/colors');

async function postAdminEmployee(req, res) {
  try {
    const { name, phone, email, password, gender } = req.body;

    let e = await Employee.findOne({ $or: [{ email }, { phone }] });
    if (e) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res
        .status(409)
        .json({ message: 'an employee with this email/phone already exist' });
    }
    let misc = await Misc.findById('unique');
    if (!misc) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(500).json({ message: 'server error' });
    }

    let employee = new Employee({
      employeeId: ++misc.latestEmployeeId,
      name,
      phone,
      email,
      gender,
      password: helpers.getHash(password),
    });
    await employee.save();
    await misc.save();
    let extension = image.filename.split('.').at(-1);
    let url = `uploads/employees/${employee._id}/image.${extension}`;
    await helpers.uploadFile(image, url);
    await helpers.deleteFile(image);
    employee.image = url;

    await employee.save();

    employee.password = undefined;
    employee.image = helpers.getS3FileUrl(employee.image);
    return res.status(201).json({ employee });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchAdminEmployee(req, res) {
  try {
    const { name, email, password, phone } = req.body;
    const { employeeId } = req.params;
    const image = req.files.image?.[0];
    console.log(image);

    let employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'employee not found' });
    }

    if (name) {
      employee.name = name;
    }

    if (phone) {
      employee.phone = phone;
    }

    if (email) {
      employee.email = email;
    }
    if (password) {
      employee.password = helpers.getHash(password);
      token = helpers.getToken(employee.email, employee.password, true);
    }

    if (employee.image) {
      await helpers.deleteS3File(employee.image);
    }

    if (image) {
      let extension = image.filename.split('.').at(-1);
      let url = `uploads/employees/${employee._id}/image.${extension}`;
      await helpers.uploadFile(image, url);
      await helpers.deleteFile(image);
      employee.image = url;
    }

    await employee.save();

    return res.status(200).json({
      message: 'employee details updated',
    });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function deleteAdminEmployee(req, res) {
  try {
    const { employeeId } = req.params;
    const { disabledReason } = req.body;

    let employee = await Employee.findById(employeeId);
    employee.disabledReason = disabledReason;
    employee.disabled = true;
    employee.disabledAt = new Date();
    await employee.save();

    return res.status(200).json({
      message: 'employee deleted successfully',
    });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getEmployee(req, res) {
  try {
    let employee = res.locals.employee;
    delete employee.password;
    return res.status(200).json({ employee });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchEmployee(req, res) {
  try {
    const { password } = req.body;
    const image = req.files.image?.[0];
    let employee = res.locals.employee;
    let token;
    if (password) {
      employee.password = helpers.getHash(password);
      token = helpers.getToken(employee.email, employee.password, true);
    }

    if (employee.image) {
      await helpers.deleteS3File(employee.image);
    }

    if (image) {
      let extension = image.filename.split('.').at(-1);
      let url = `uploads/employees/${employee._id}/image.${extension}`;
      await helpers.uploadFile(image, url);
      await helpers.deleteFile(image);
      employee.image = url;
    }

    await employee.save();
    return res.json({ message: 'details updated', token });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getAdminEmployees(req, res) {
  try {
    let {
      limit,
      page,
      employeeId,
      name,
      email,
      gender,
      disabled,
      sortBy,
      sortOrder,
    } = req.query;

    limit = limit ? +limit : 10;
    page = page ? +page : 1;

    if (!sortBy) {
      sortBy = 'employeeId';
    }
    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};

    if (employeeId) {
      employeeId = +employeeId;
      match.employeeId = employeeId;
    }

    if (name) {
      match.name = name;
    }

    if (email) {
      match.email = email;
    }

    if (gender) {
      match.gender = gender;
    }

    if (disabled) {
      disabled = disabled === 'true';
      match.disabled = disabled;
    } else {
      match.disabled = { $exists: false };
    }

    let query = Employee.find(match)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    let employees = await query;
    let count = await Employee.find(match).countDocuments();
    employees.forEach((e) => (e.image = helpers.getS3FileUrl(e.image)));

    employees.forEach((e) => (e.password = undefined));
    return res.json({ employees, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getAdminClients(req, res) {
  try {
    let { limit, page, _id, name, email, phone, gender, sortBy, sortOrder } =
      req.query;

    limit = limit ? +limit : 10;
    page = page ? +page : 1;

    if (!sortBy) {
      sortBy = 'createdAt';
    }
    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};

    if (_id) {
      match._id = _id;
    }

    if (name) {
      match.name = name;
    }

    if (email) {
      match.email = email;
    }

    if (gender) {
      match.gender = gender;
    }

    if (phone) {
      match.phone = phone;
    }

    let query = Client.find(match)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    let clients = await query;
    let count = await Client.find(match).countDocuments();
    clients.forEach((e) => (e.image = helpers.getS3FileUrl(e.image)));
    return res.json({ clients, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getAdminClient(req, res) {
  try {
    let { clientId } = req.params;

    let client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'client not found' });
    }
    client.image = helpers.getS3FileUrl(client.image);
    return res.json({ client });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getAdminInterns(req, res) {
  try {
    let { limit, page, _id, name, email, phone, gender, sortBy, sortOrder } =
      req.query;

    limit = limit ? +limit : 10;
    page = page ? +page : 1;

    if (!sortBy) {
      sortBy = 'createdAt';
    }
    if (!sortOrder) {
      sortOrder = 'descending';
    }

    let match = {};

    if (_id) {
      match._id = _id;
    }

    if (name) {
      match.name = name;
    }

    if (email) {
      match.email = email;
    }

    if (gender) {
      match.gender = gender;
    }

    if (phone) {
      match.phone = phone;
    }

    let query = Intern.find(match)
      .sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    let interns = await query;
    let count = await Intern.find(match).countDocuments();

    interns.forEach((e) => (e.image = helpers.getS3FileUrl(e.image)));

    return res.json({ interns, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function getAdminIntern(req, res) {
  try {
    let { internId } = req.params;

    let intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'intern not found' });
    }
    intern.image = helpers.getS3FileUrl(intern.image);
    return res.json({ intern });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function postAdminClient(req, res) {
  try {
    let { name, email, phone, gender } = req.body;
    let c = await Client.findOne({ $or: [{ email }, { phone }] });
    
    const image = req.files?.image?.[0];

    if (c) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res
        .status(409)
        .json({ message: 'an client with this email/phone already exist' });
    }

    let client = new Client({
      name,
      email,
      phone,
      gender,
    });
    await client.save();

    if (image) {
      let extension = image.filename.split('.').at(-1);
      let url = `uploads/clients/${client._id}/image.${extension}`;
      await helpers.uploadFile(image, url);
      await helpers.deleteFile(image);
      client.image = url;

      await client.save();
      client.image = helpers.getS3FileUrl(client.image);
    }

    return res.json({ client });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchAdminClient(req, res) {
  try {
    let { name, phone, email, gender } = req.body;
    let { clientId } = req.params;
    const image = req.files?.image?.[0];

    let client = await Client.findById(clientId);
    if (!client) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(404).json({ message: 'client not found' });
    }

    if (name) {
      client.name = name;
    }

    if (phone) {
      client.phone = phone;
    }

    if (email) {
      client.email = email;
    }

    if (gender) {
      client.gender = gender;
    }

    if (image) {
      if (client.image) {
        await helpers.deleteS3File(client.image);
      }
      let extension = image.filename.split('.').at(-1);
      let url = `uploads/clients/${client._id}/image.${extension}`;
      await helpers.uploadFile(image, url);
      await helpers.deleteFile(image);
      client.image = url;
    }

    await client.save();
    return res.json({ message: 'client updated successfully' });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function deleteAdminClient(req, res) {
  try {
    let { clientId } = req.params;

    let client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'client not found' });
    }

    if (client.image) {
      await helpers.deleteS3File(client.image);
    }
    await client.deleteOne();
    return res.status(204).json({ message: 'client deleted successfully' });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function postAdminIntern(req, res) {
  try {
    let { name, email, phone, gender } = req.body;

    let i = await Intern.findOne({
      $or: [{ email }, { phone }],
    });
    
    const image = req.files?.image?.[0];
    if (i) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res
        .status(409)
        .json({ message: 'an intern with this email/phone already exist' });
    }

    let intern = new Intern({
      name,
      email,
      phone,
      gender,
    });

    await intern.save();

    let extension = image.filename.split('.').at(-1);
    let url = `uploads/interns/${intern._id}/image.${extension}`;
    await helpers.uploadFile(image, url);
    await helpers.deleteFile(image);
    intern.image = url;

    await intern.save();

    intern.image = helpers.getS3FileUrl(intern.image);

    return res
      .status(201)
      .json({ intern });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function patchAdminIntern(req, res) {
  try {
    let { name, phone, email, gender } = req.body;
    let { internId } = req.params;
    const image = req.files?.image?.[0];

    let intern = await Intern.findById(internId);
    if (!intern) {
      if (image) {
        await helpers.deleteFile(image);
      }
      return res.status(404).json({ message: 'intern not found' });
    }

    if (name) {
      intern.name = name;
    }

    if (phone) {
      intern.phone = phone;
    }

    if (email) {
      intern.email = email;
    }

    if (gender) {
      intern.gender = gender;
    }

    if (image) {
      if (intern.image) {
        await helpers.deleteS3File(intern.image);
      }
      let extension = image.filename.split('.').at(-1);
      let url = `uploads/interns/${intern._id}/image.${extension}`;
      await helpers.uploadFile(image, url);
      await helpers.deleteFile(image);
      intern.image = url;
    }

    await intern.save();
    return res.json({ message: 'intern updated successfully' });
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
}

async function deleteAdminIntern(req, res) {
  try {
    let { internId } = req.params;
    let intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).status({ message: 'intern not found' });
    }
    if (intern.image) {
      await helpers.deleteS3File(intern.image);
    }
    await intern.deleteOne();
    return res.sendStatus(204);
  } catch (error) {
    console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
    return res.status(500).json({ message: 'server error' });
  }
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
  getAdminIntern,
  getAdminInterns,
};
