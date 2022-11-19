const AdminsService = require ('../services/admins.js');
const OrgsService = require ('../services/organizations.js');
const bcrypt = require('bcrypt');

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
        const orgs = await OrgsService.getOrgsData()

        let isOrgRegistered = false;
        let orgid = 0;
        for (let i=0; i<orgs.length; i++) {
            if (await bcrypt.compare(req.body.companycode, orgs[i].companycode) && req.body.companyname == orgs[i].name) {
                isOrgRegistered = true;
                orgid = orgs[i].id;
                break;
            }
        }
        if (isOrgRegistered == false) {
            res.status(400).json({"message": `Company not found`});
        } else {
            const users = await AdminsService.getAdmin(req.body.username);
            if (users != 0) {
                res.status(400).json({"message": `User already exists`});
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                    const adminData = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        companycode: hashedCompanycode,
                        organizationid: orgid
                    };
                    const admin = await AdminsService.addAdmin(adminData);
                    res.status(200).json(admin)
                } catch (err) {
                    res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
                }
            }
        }
    },

    login : async (req, res, next) => {
        const password = await AdminsService.getPassword(req.body.username);

        if (password == 0) {
            res.status(400).json({"message": `User not found`});
        } else {
            try {
                if (await bcrypt.compare(req.body.password, password[0].password)) {
                    const admin = await AdminsService.getAdmin(req.body.username);
                    res.status(200).json(admin)
                } else {
                    res.json({"message": `Not Allowed`});
                } 
            } catch (err) {
                res.status(500).json({"message": `Error while getting admin. Err: ${err}`});
            }
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