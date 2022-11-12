const express = require('express');
const router = express.Router();

const EmployeesControllers = require('../controllers/employees.js');

router.get('/', EmployeesControllers.getAllEmployees);

router.get('/:email', EmployeesControllers.getEmployee);

router.get('/byorg/:orgid', EmployeesControllers.getEmployeesByOrg);

router.get('/alldatabyorg/:orgid', EmployeesControllers.getAllDataByOrg);

router.post('/add', EmployeesControllers.addEmployee);

router.put('/update_password', EmployeesControllers.updatePassword);

module.exports = router;