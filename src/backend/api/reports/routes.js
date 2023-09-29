let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
let { FileUploader } = require('../../utils/uploaders');
const router = Router();

router.get(
  '/admins',
  auth.authorizeAdmin,
  validations.getAdminReports,
  controllers.getAdminReports
);

router.get(
  '/admins/:reportId',
  auth.authorizeAdmin,
  validations.getAdminReport,
  controllers.getAdminReport
);


router.patch(
  '/admins/:reportId',
  auth.authorizeAdmin,
  validations.patchAdminReport,
  controllers.patchAdminReport
);

router.get(
  '/',
  auth.authorizeEmployee,
  validations.getReports,
  controllers.getReports
);

router.get(
  '/:reportId',
  auth.authorizeEmployee,
  validations.getReport,
  controllers.getReport
);

router.post(
  '/',
  FileUploader.fields([{ name: 'files', maxCount: 10 }]),
  auth.authorizeEmployee,
  validations.postReport,
  controllers.postReport
);

module.exports = router;
