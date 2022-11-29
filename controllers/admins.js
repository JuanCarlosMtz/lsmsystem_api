const AdminsService = require ('../services/admins.js');
const OrgsService = require ('../services/organizations.js');
const EmployeesService = require ('../services/employees.js');
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
            const response = {
                insertId: -1,
                message : "Company not found"
            };
            res.status(200).json(response);
        } else {
            const users = await AdminsService.getAdmin(req.body.username);
            if (users != 0) {
                const response = {
                    insertId: -1,
                    message : "User already exists"
                };
                res.status(200).json(response);
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
            const response = [
                {
                    id: -1,
                    message : "User not found"
                }
            ];
            res.status(200).json(response);
        } else {
            try {
                if (await bcrypt.compare(req.body.password, password[0].password)) {
                    const admin = await AdminsService.getAdmin(req.body.username);
                    res.status(200).json(admin)
                } else {
                    const response = [
                        {
                            id: -1,
                            message : "Not allowed"
                        }
                    ];
                    res.json(response);
                } 
            } catch (err) {
                res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
            }
        }
    },


    setNewPassword : async (req, res, next) => {
        const employee = await EmployeesService.getEmployee(req.body.username);

        if (employee == 0) {
            const response = [
                {
                    id: -1,
                    message : "User not found",
                    affectedRows: -1
                }
            ];
            res.status(200).json(response);
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const employeeData = {
                    username: req.body.username,
                    password: hashedPassword,
                };
                const employee = await AdminsService.setNewPassword(employeeData);
                res.status(200).json([employee])
            } catch (err) {
                res.status(500).json({"message": `Error while getting user. Err: ${err}`});
            }
        }
    }
};