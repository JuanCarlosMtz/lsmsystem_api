const AdminsService = require ('../services/admins.js');

module.exports = {
    getAllAdmins : async (req, res, next) => {
        try {
            const admins = await AdminsService.getAllAdmins();
            res.status(200).json(admins) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting admins. Err: ${err}`});
        }
    },

    getAdmin : async (req, res, next) => {
        try {
            const admin = await AdminsService.getAdmin(req.params.username);
            res.status(200).json(admin)
        } catch (err) {
            res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
        }
    },

    addAdmin : async (req, res, next) => {
        try {
            const admin = await AdminsService.addAdmin(req.body);
            res.status(200).json(admin)
        } catch (err) {
            res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
        }
    },

    updatePassword : async (req, res, next) => {
        try {
            const data = await AdminsService.updatePassword(req.body);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({"message": `Error while getting data. Err: ${err}`});
        }
    }
};