let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
let { FileUploader} = require('../../utils/uploaders');
const router = Router();

router.post(
  '/admins',
  FileUploader.fields([{name: 'files', maxCount: 10}]),
  auth.authorizeAdmin,
  validations.postAdminProject,
  controllers.postAdminProject
);

router.patch(
  '/admins/:projectId',
  auth.authorizeAdmin,
  validations.patchAdminProject,
  controllers.patchAdminProject
);

router.get(
  '/admins',
  auth.authorizeAdmin,
  validations.getAdminProjects,
  controllers.getAdminProjects
);

router.get(
  '/admins/:projectId',
  auth.authorizeAdmin,
  validations.getAdminProject,
  controllers.getAdminProject
);

router.get('/', auth.authorizeEmployee, validations.getProjects, controllers.getProjects);

router.get(
  '/:projectId',
  auth.authorizeEmployee,
  validations.getProject,
  controllers.getProject
);

module.exports = router;
