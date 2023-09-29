let { Project } = require('./models');
let { ProjectMember } = require('../project-members/models');
let helpers = require('../../utils/helpers');
let colors = require('../../utils/colors');
const { Client } = require('../users/models');

async function getAdminProjects(req, res) {
	try {
		let { limit, page, _id, key, client, withClient, status, sortBy, sortOrder } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;
		withClient = withClient === 'true';

		if (!sortBy) {
			sortBy = 'createdAt';
		}

		if (!sortOrder) {
			sortOrder = 'descending';
		}

		let match = {};

		if (key) {
			match.$or = [
				{
					title: new RegExp(key, 'i'),
				},
				{
					description: new RegExp(key, 'i'),
				},
			];
		}

		if (client) {
			match.client = client;
		}

		if (_id) {
			match._id = _id;
		}

		if (status) {
			match.status = status;
		}

		let query = Project.find(match)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

		if (withClient) {
			query.populate('client');
		}

		let projects = await query;
		projects.forEach(project => project.files = project.files.map((e) => helpers.getS3FileUrl(e)));
		let count = await Project.find(match).countDocuments();
		return res.json({ projects, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function getAdminProject(req, res) {
	try {
		let { projectId } = req.params;

		let project = await Project.findById(projectId).populate('client');
		if (!project) {
			return res.status(404).json({ message: 'project not found' });
		}

		project.files = project.files.map((e) => helpers.getS3FileUrl(e));

		return res.json({ project });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function postAdminProject(req, res) {
	try {
		let { title, description, client, duration } = req.body;
		const files = req.files?.files;

    if(client) {
      let c = await Client.findById(client);
      if(!c) {
				if(files) {
					for(let file of files) {
						await helpers.deleteFile(file);
					}
				}
        return res.status(404).json({message: 'client not found'})
      }
    }

		let project = new Project({
			title,
			description,
			client,
			duration: +duration,
			status: 'pending',
		});
		await project.save();

		if (files) {
			let array = [];
			for (let file of files) {
				let url = `uploads/projects/${project._id}/${file.originalname}`;
				await helpers.uploadFile(file, url);
				await helpers.deleteFile(file);
				array.push(url);
			}
			project.files = array;
			await project.save();
			project.files = project.files.map((e) => helpers.getS3FileUrl(e));
		}

		return res.status(201).json({ project });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function patchAdminProject(req, res) {
	try {
		let { projectId } = req.params;
		let { title, description, duration, status } = req.body;

		let project = await Project.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: 'project not found' });
		}

    if(project.status === 'completed' || project.status === 'cancelled') {
      return res.status(403).json({message: 'project is already finished'})
    }

		if (title) {
			project.title = title;
		}

		if (description) {
			project.description = description;
		}

		if (status) {
			if (project.status === 'completed' || project.status === 'cancelled') {
				return res.status(409).json({ message: 'project is already finished' });
			}
			project.status = status;
		}

		if (duration) {
			project.duration = duration;
		}

		await project.save();

		return res.json({ message: 'project details updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function getProjects(req, res) {
	try {
		let { limit, page, _id, key, withClient, status, sortBy, sortOrder } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;
		withClient = withClient === 'true';

		if (!sortBy) {
			sortBy = 'createdAt';
		}

		if (!sortOrder) {
			sortOrder = 'descending';
		}

		let match = {};

		if (key) {
			match.$or = [
				{
					title: new RegExp(key, 'i'),
				},
				{
					description: new RegExp(key, 'i'),
				},
			];
		}

		if (_id) {
			match._id = _id;
		}

		if (status) {
			match.status = status;
		}

		let query = Project.find(match)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ [sortBy]: sortOrder === 'descending' ? -1 : 1 });

		if (withClient) {
			query.populate('client');
		}

		let projects = await query;
		projects.forEach(project => project.files = project.files.map((e) => helpers.getS3FileUrl(e)));
		let count = await Project.find(match).countDocuments();
		return res.json({ projects, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function getProject(req, res) {
	try {
		let { projectId } = req.params;

		let project = await Project.findById(projectId).populate('client');
		if (!project) {
			return res.status(404).json({ message: 'project not found' });
		}

		project.files = project.files.map((e) => helpers.getS3FileUrl(e));

		return res.json({ project });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

module.exports = {
	getAdminProjects,
	getAdminProject,
	patchAdminProject,
	getProjects,
	getProject,
	postAdminProject,
};
