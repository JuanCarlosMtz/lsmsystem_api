const OrgsService = require ('../services/organizations.js');
const bcrypt = require('bcrypt');

module.exports = {
    getAllOrgs : async (req, res, next) => {
        try {
            const orgs = await OrgsService.getAllOrgs();
            res.status(200).json(orgs) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting organizations. Err: ${err}`});
        }
    },

    getById : async (req, res, next) => {
        try {
            const org = await OrgsService.getById(req.params.id);
            res.status(200).json(org) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    },

    verifyOrg : async (req, res, next) => {
        try {
            const org = await OrgsService.verifyOrg(req.body);
            res.status(200).json(org)
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    },

    addOrg : async (req, res, next) => {
        const org = await OrgsService.getOrg(req.body.name);

        if (org != 0) {
            res.status(400).json({"message": `Org already exists`});
        } else {
            try {
                const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                const orgData = {
                    name: req.body.name,
                    companycode: hashedCompanycode
                };
                const org = await OrgsService.addOrg(orgData);
                res.status(200).json(org)
            } catch (err) {
                res.status(500).json({"message": `Error while getting org. Err: ${err}`});
            }
        }
    }
};