let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
let { ImageUploader } = require('../../utils/uploaders');
const router = Router();

router.post(
  '/employees/admins',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeAdmin,
  validations.postAdminEmployee,
  controllers.postAdminEmployee
);

router.delete(
  '/employees/admins/:employeeId',
  auth.authorizeAdmin,
  validations.deleteAdminEmployee,
  controllers.deleteAdminEmployee
);

router.patch(
  '/employees/admins/:employeeId',
  auth.authorizeAdmin,
  validations.patchAdminEmployee,
  controllers.patchAdminEmployee
);

router.post(
  '/clients/admins',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeAdmin,
  validations.postAdminClient,
  controllers.postAdminClient
);

router.delete(
  '/clients/admins/:clientId',
  auth.authorizeAdmin,
  validations.deleteAdminClient,
  controllers.deleteAdminClient
);

router.patch(
  '/clients/admins/:clientId',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeAdmin,
  validations.patchAdminClient,
  controllers.patchAdminClient
);

router.post(
  '/interns/admins',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeAdmin,
  validations.postAdminIntern,
  controllers.postAdminIntern
);

router.delete(
  '/interns/admins/:internId',
  auth.authorizeAdmin,
  validations.deleteAdminIntern,
  controllers.deleteAdminIntern
);

router.patch(
  '/interns/admins/:internId',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeAdmin,
  validations.patchAdminIntern,
  controllers.patchAdminIntern
);

router.get(
  '/employees',
  auth.authorizeAdmin,
  validations.getEmployee,
  controllers.getEmployee
);

router.patch(
  '/employees',
  ImageUploader.fields([{ name: 'image', maxCount: 1 }]),
  auth.authorizeEmployee,
  validations.patchEmployee,
  controllers.patchEmployee
);

router.get(
  '/employees/admins',
  auth.authorizeAdmin,
  validations.getAdminEmployees,
  controllers.getAdminEmployees
);

router.get(
  '/clients/admins',
  auth.authorizeAdmin,
  validations.getAdminClients,
  controllers.getAdminClients
);

router.get(
  '/clients/admins/:clientId',
  auth.authorizeAdmin,
  validations.getAdminClient,
  controllers.getAdminClient
);

router.get(
  '/interns/admins',
  auth.authorizeAdmin,
  validations.getAdminInterns,
  controllers.getAdminInterns
);

router.get(
  '/interns/admins/:internId',
  auth.authorizeAdmin,
  validations.getAdminIntern,
  controllers.getAdminIntern
);

module.exports = router;
