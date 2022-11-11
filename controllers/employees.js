const EmployeesService = require ('../services/employees.js');

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
        try {
            const employee = await EmployeesService.addEmployee(req.body);
            res.status(200).json(employee)
        } catch (err) {
            res.status(500).json({"message": `Error while getting employee. Err: ${err}`});
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