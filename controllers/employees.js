const EmployeesService = require ('../services/employees.js');
const OrgsService = require ('../services/organizations.js');
const bcrypt = require('bcrypt');

module.exports = {
    getAllEmployees : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getAllEmployees();
            res.status(200).json(employees) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },

    getEmployee : async (req, res, next) => {
        try {
            const employee = await EmployeesService.getEmployee(req.params.username);
            res.status(200).json(employee)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
        }
    },

    getEmployeesByOrg : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getEmployeesByOrg(req.params.orgid);
            res.status(200).json(employees)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },

    getAllDataByOrg : async (req, res, next) => {
        try {
            const employees = await EmployeesService.getAllDataByOrg(req.params.orgid);
            res.status(200).json(employees)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employees. Err: ${err}`});
        }
    },

    addEmployee : async (req, res, next) => {
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
            const users = await EmployeesService.getEmployee(req.body.username);
            if (users != 0) {
                res.status(400).json({"message": `User already exists`});
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const hashedCompanycode = await bcrypt.hash(req.body.companycode, 10);
                    const employeeData = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        companycode: hashedCompanycode,
                        organizationid: orgid
                    };
                    const employee = await EmployeesService.addEmployee(employeeData);
                    res.status(200).json(employee)
                } catch (err) {
                    res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
                }
            }
        }
    },

    login : async (req, res, next) => {
        const password = await EmployeesService.getPassword(req.body.username);

        if (password == 0) {
            res.status(400).json({"message": `User not found`});
        } else {
            try {
                if (await bcrypt.compare(req.body.password, password[0].password)) {
                    const employee = await EmployeesService.authEmployee(req.body.username);
                    res.status(200).json(employee)
                } else {
                    res.json({"message": `Not Allowed`});
                } 
            } catch (err) {
                res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
            }
        }
    },

    updatePassword : async (req, res, next) => {
        try {
            const data = await EmployeesService.updatePassword(req.body);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({"message": `Error while getting data. Err: ${err}`});
        }
    }
};