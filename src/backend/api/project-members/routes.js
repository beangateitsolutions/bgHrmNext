let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
const router = Router();

router.get(
  '/admins',
  auth.authorizeAdmin,
  validations.getAdminProjectMembers,
  controllers.getAdminProjectMembers
);

router.post(
  '/admins',
  auth.authorizeAdmin,
  validations.postAdminProjectMembers,
  controllers.postAdminProjectMembers
);

router.delete(
  '/admins/:projectMemberId',
  auth.authorizeAdmin,
  validations.deleteAdminProjectMembers,
  controllers.deleteAdminProjectMembers
);


router.get(
  '/',
  auth.authorizeEmployee,
  validations.getProjectMembers,
  controllers.getProjectMembers
);

module.exports = router;
