const express = require('express');
const router = express.Router();

const EmployeesControllers = require('../controllers/employees.js');

router.get('/', EmployeesControllers.getAllEmployees);

router.get('/:username', EmployeesControllers.getEmployee);

router.get('/byorg/:orgid', EmployeesControllers.getEmployeesByOrg);

router.get('/alldatabyorg/:orgid', EmployeesControllers.getAllDataByOrg);

router.post('/add', EmployeesControllers.addEmployee);

router.post('/login', EmployeesControllers.login);

router.put('/update_password', EmployeesControllers.updatePassword);

module.exports = router;