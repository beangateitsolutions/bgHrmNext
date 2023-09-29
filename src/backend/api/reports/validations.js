let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

function getAdminReports(req, res, next) {
	try {
		let rules = {
			limit: 'optional|string|natural',
			page: 'optional|string|natural',
			message: 'optional|string',
			employee: 'optional|mongoid',
			status: 'optional|enums:pending,resolved',
			withEmployee: 'optional|string|boolean',
			sortBy: 'optional|enums:createdAt',
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

function getAdminReport(req, res, next) {
	return next();
}

async function patchAdminReport(req, res, next) {
	try {
		const rules = {
			status: 'string|equal:resolved',
		};
		const { errors } = validate(rules, req.body);
		if (errors) {
			console.log(errors);
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

function getReports(req, res, next) {
	try {
		let rules = {
			limit: 'optional|string|natural',
			page: 'optional|string|natural',
			message: 'optional|string',
			status: 'optional|enums:pending,resolved',
			sortBy: 'optional|enums:createdAt',
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

function getReport(req, res, next) {
	return next();
}

async function postReport(req, res, next) {
	try {
		const rules = {
			message: 'string|min:3',
		};
		const { errors } = validate(rules, req.body);
		if (errors) {
			if (req.files?.files) {
				for (let file of req.files.files) {
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

module.exports = {
	getAdminReports,
	getAdminReport,
	patchAdminReport,
	getReports,
	getReport,
	postReport,
};
