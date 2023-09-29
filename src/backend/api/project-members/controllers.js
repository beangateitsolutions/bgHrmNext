let { ProjectMember } = require('./models');
let { Project } = require('../projects/models');
let helpers = require('../../utils/helpers');
let colors = require('../../utils/colors');
const { Employee, Intern } = require('../users/models');

async function getAdminProjectMembers(req, res) {
	try {
		let { limit, page, project, withProject, employee, withEmployee, intern, withIntern, sortBy, sortOrder } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;
		withProject = withProject === 'true';
		withEmployee = withEmployee === 'true';
		withIntern = withIntern === 'true';

		if (!sortBy) {
			sortBy = 'createdAt';
		}

		if (!sortOrder) {
			sortOrder = 'descending';
		}

		let match = {};

		if (project) {
			match.project = project;
		}

		if (employee) {
			match.employee = employee;
		}

		if (intern) {
			match.intern = intern;
		}

		let query = ProjectMember.find(match)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

    if(withProject) {
      query.populate('project')
    }
		if (withEmployee) {
			query.populate('employee');
		}
    if(withIntern) {
      query.populate('intern')
    }

		let projectMembers = await query;
		let count = await ProjectMember.find(match).countDocuments();
		return res.json({ projectMembers, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function postAdminProjectMembers(req, res) {
	try {
		let { project, employee, intern } = req.body;

    let p = await Project.findById(project);
    if(!p) {
      return res.status(404).json({message: 'project not found'})
    }

    if(employee) {
      let emp = await Employee.findById(employee);
      if(!emp) {
        return res.status(404).json({message: 'employee not found'})
      }

      let projectMember = await ProjectMember.findOne({
        employee,
        project
      })
      if(projectMember) {
        return res.status(409).json({message: 'project member already exist'})
      }
    }

    if(intern) {
      let int = await Intern.findById(intern);
      if(!int) {
        return res.status(404).json({message: 'intern not found'})
      }

      let projectMember = await ProjectMember.findOne({
        intern,
        project
      })
      if(projectMember) {
        return res.status(409).json({message: 'project member already exist'})
      }
    }

		let projectMember = new ProjectMember({
			project,
			employee,
			intern,
		});
		await projectMember.save();

		return res.status(201).json({ projectMember });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function deleteAdminProjectMembers(req, res) {
	try {
		let { projectMemberId } = req.params;

		let projectMember = await ProjectMember.findById(projectMemberId);
		if (!projectMember) {
			return res.status(404).json({ message: 'project member not found' });
		}

    await projectMember.deleteOne()

		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function getProjectMembers(req, res) {
	try {
		let { limit, page, project, withProject, withEmployee, withIntern, sortBy, sortOrder } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;
		withProject = withProject === 'true';
		withEmployee = withEmployee === 'true';
		withIntern = withIntern === 'true';

		if (!sortBy) {
			sortBy = 'createdAt';
		}

		if (!sortOrder) {
			sortOrder = 'descending';
		}

		let match = {};

		if (project) {
			match.project = project;
		}

		let query = ProjectMember.find(match)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

    if(withProject) {
      query.populate('project')
    }
		if (withEmployee) {
			query.populate('employee');
		}
    if(withIntern) {
      query.populate('intern')
    }

		let projectMembers = await query;
		let count = await Project.find(match).countDocuments();
		return res.json({ projectMembers, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

module.exports = {
	getAdminProjectMembers,
  postAdminProjectMembers,
  deleteAdminProjectMembers,
  getProjectMembers,
};
