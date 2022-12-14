const express = require('express');
const router = express.Router();

const ProgressControllers = require('../controllers/progress.js');

router.get('/', ProgressControllers.getAllProgress);

router.get('/:employeeid', ProgressControllers.getProgress);

router.get('/total/progress/:organizationid', ProgressControllers.getTotalProgress);

router.post('/create', ProgressControllers.createProgress);

router.put('/update', ProgressControllers.updateProgress);

module.exports = router;