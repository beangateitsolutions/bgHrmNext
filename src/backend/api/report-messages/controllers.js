let { ReportMessage } = require('./models');
let { Report } = require('../reports/models');
let helpers = require('../../utils/helpers');

async function getAdminMessages(req, res) {
	try {
		let { limit, page, report } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;

		const reportDoc = await Report.findById(report);
		if (!reportDoc) {
			return res.status(404).json({ message: 'report not found' });
		}

    let match = {report}
		let query = ReportMessage.find(match)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		let reportMessages = await query;
    reportMessages.forEach(reportMessage => reportMessage.files = reportMessage.files.map(f => helpers.getS3FileUrl(f)))
		let count = await ReportMessage.find(match).countDocuments();

		return res.json({ reportMessages, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function getMessages(req, res) {
	try {
		let { limit, page, report } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;

		const reportDoc = await Report.findById(report);
		if (!reportDoc) {
			return res.status(404).json({ message: 'report not found' });
		}

		if (`${reportDoc.employee}` !== `${res.locals.employee._id}`) {
			return res.status(403).json({ message: 'permission denied' });
		}

    let match = { report }
		let query = ReportMessage.find(match)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		let reportMessages = await query;
    reportMessages.forEach(reportMessage => reportMessage.files = reportMessage.files.map(f => helpers.getS3FileUrl(f)))
		let count = await ReportMessage.find(match).countDocuments();

		return res.json({ reportMessages, count });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function postAdminMessage(req, res) {
	try {
		let { message, report } = req.body;
		const files = req.files?.files;

		const reportDoc = await Report.findById(report);
		if (!reportDoc) {
			if(files) {
				for(let file of files) {
					await helpers.deleteFile(file);
				}
			}
			return res.status(404).json({ message: 'report not found' });
		}

    if (reportDoc.status === 'resolved') {
			if(files) {
				for(let file of files) {
					await helpers.deleteFile(file);
				}
			}
			return res.status(403).json({ message: 'permission denied' });
		}

		let reportMessage = new ReportMessage({
			message,
			report,
      sentBy: 'admin',
		});
		await reportMessage.save();

		if (files) {
			let array = [];
			for (let file of files) {
				let url = `uploads/reports/${report}/${file.originalname}`;
				await helpers.uploadFile(file, url);
				await helpers.deleteFile(file);
				array.push(url);
			}
			reportMessage.files = array;
			await reportMessage.save();
			reportMessage.files = reportMessage.files.map((e) => helpers.getS3FileUrl(e));
		}

		return res.status(201).json({ reportMessage });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

async function postMessage(req, res) {
	try {
		let { message, report } = req.body;
		const files = req.files?.files;

		const reportDoc = await Report.findById(report);
		if (!reportDoc) {
			if(files) {
				for(let file of files) {
					await helpers.deleteFile(file);
				}
			}
			return res.status(404).json({ message: 'report not found' });
		}

    if (`${reportDoc.employee}` !== `${res.locals.employee._id}` || reportDoc.status === 'resolved') {
			if(files) {
				for(let file of files) {
					await helpers.deleteFile(file);
				}
			}
			return res.status(403).json({ message: 'permission denied' });
		}

		let reportMessage = new ReportMessage({
			message,
			report,
      sentBy: 'employee',
		});
		await reportMessage.save();

		if (files) {
			let array = [];
			for (let file of files) {
				let url = `uploads/reports/${report}/${file.originalname}`;
				await helpers.uploadFile(file, url);
				await helpers.deleteFile(file);
				array.push(url);
			}
			reportMessage.files = array;
			await reportMessage.save();
			reportMessage.files = reportMessage.files.map((e) => helpers.getS3FileUrl(e));
		}

		return res.status(201).json({ reportMessage });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
}

module.exports = {
	getAdminMessages,
	getMessages,
	postAdminMessage,
	postMessage,
};
