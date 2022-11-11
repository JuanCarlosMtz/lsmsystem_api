const express = require('express');
const router = express.Router();

router.use('/admins', require('./admins.js'));
router.use('/employees', require('./employees.js'));
router.use('/organizations', require('./organizations.js'));
router.use('/progress', require('./progress.js'));

module.exports = router;