const OrgsService = require ('../services/organizations.js');

module.exports = {
    getAllOrgs : async (req, res, next) => {
        try {
            const orgs = await OrgsService.getAllOrgs();
            res.status(200).json(orgs) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting organizations. Err: ${err}`});
        }
    },

    getOrg : async (req, res, next) => {
        try {
            const org = await OrgsService.getOrg(req.params.name);
            res.status(200).json(org)
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    },

    addOrg : async (req, res, next) => {
        try {
            const org = await OrgsService.addOrg(req.body);
            res.status(200).json(org)
        } catch (err) {
            res.status(500).json({"message": `Error while getting organization. Err: ${err}`});
        }
    }
};