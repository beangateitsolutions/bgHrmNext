let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
let { FileUploader } = require('../../utils/uploaders');
const router = Router();

router.get(
  '/admins',
  auth.authorizeAdmin,
  validations.getAdminMessages,
  controllers.getAdminMessages
);

router.post(
  '/admins',
  FileUploader.fields([{ name: 'files', maxCount: 10 }]),
  auth.authorizeAdmin,
  validations.postAdminMessage,
  controllers.postAdminMessage
);

router.get(
  '/',
  auth.authorizeEmployee,
  validations.getMessages,
  controllers.getMessages
);

router.post(
  '/',
  FileUploader.fields([{ name: 'files', maxCount: 10 }]),
  auth.authorizeEmployee,
  validations.postMessage,
  controllers.postMessage
);

module.exports = router;
