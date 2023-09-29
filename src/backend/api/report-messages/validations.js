let { validate } = require('super-easy-validator');
let colors = require('../../utils/colors');
let helpers = require('../../utils/helpers');

function getAdminMessages(req, res, next) {
	try {
		let rules = {
			limit: 'optional|string|natural',
			page: 'optional|string|natural',
			report: 'mongoid',
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

function getMessages(req, res, next) {
	try {
		let rules = {
			limit: 'optional|string|natural',
			page: 'optional|string|natural',
			report: 'mongoid',
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

async function postAdminMessage(req, res, next) {
	try {
		const rules = {
			message: 'string|min:5',
			report: 'mongoid',
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

async function postMessage(req, res, next) {
	try {
		const rules = {
			message: 'string|min:10',
			report: 'mongoid',
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
	getAdminMessages,
	getMessages,
	postAdminMessage,
	postMessage,
};
