let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
let auth = require('../auth/auth');
const router = Router();

router.get(
  '/admin',
  auth.authorizeAdmin,
  validations.getAdminAttendances,
  controllers.getAdminAttendances
);


router.get(
  '/',
  auth.authorizeEmployee,
  validations.getAttendances,
  controllers.getAttendances
);

router.post(
  '/',
  auth.authorizeEmployee,
  validations.postAttendance,
  controllers.postAttendance
);

router.patch(
  '/',
  auth.authorizeEmployee,
  validations.patchAttendance,
  controllers.patchAttendance
);

module.exports = router;
