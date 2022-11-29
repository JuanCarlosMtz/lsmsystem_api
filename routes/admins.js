const express = require('express');
const router = express.Router();

const AdminsControllers = require('../controllers/admins.js');

router.get('/', AdminsControllers.getAllAdmins);

router.get('/:username', AdminsControllers.getAdmin);

router.post('/add', AdminsControllers.addAdmin);

router.post('/login', AdminsControllers.login);

router.post('/setnewpwd', AdminsControllers.setNewPassword);

module.exports = router;