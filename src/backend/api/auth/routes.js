let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
const auth = require('./auth');
const router = Router();


router.post('/admins/login', validations.adminLogin, controllers.adminLogin);


router.post(
  '/employees/login',
  validations.employeeLogin,
  controllers.employeeLogin
);

router.post(
  '/employees/logout',
  auth.authorizeEmployee,
  controllers.employeeLogout
);



module.exports = router;
