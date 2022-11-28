const express = require('express');
const router = express.Router();

const OrgControllers = require('../controllers/organizations.js');

router.get('/', OrgControllers.getAllOrgs);

router.get('/byid/:id', OrgControllers.getById);

router.post('/verifyorg', OrgControllers.verifyOrg);

router.post('/add', OrgControllers.addOrg);

module.exports = router;