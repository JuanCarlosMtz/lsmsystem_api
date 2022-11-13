const dbService = require('../config/db.js');

const getAllEmployees = () => {
    sql = `SELECT * FROM employee`

    return dbService.querypromise(sql);

};

const getEmployee = (email) => {

    sql = `SELECT * FROM employee
    WHERE email = '${email}'`

    return dbService.querypromise(sql);
};

const getEmployeesByOrg = (orgid) => {

    sql = `SELECT * FROM employee
    WHERE organizationid = ${orgid}`

    return dbService.querypromise(sql);
};

const getAllDataByOrg = (orgid) => {

    sql = `SELECT * FROM employee INNER JOIN progress on employee.id = progress.employeeid WHERE employee.organizationid = ${orgid}`

    return dbService.querypromise(sql);
};

const addEmployee = (body) => {
    const {firstname, lastname, email, password, companycode, reg_date, organizationid} = body;

    sql = `INSERT INTO employee (firstname, lastname, email, password, companycode, reg_date, organizationid) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${companycode}', now(), ${organizationid})`

    return dbService.querypromise(sql);
}

const updatePassword = (body) => {

    const {password, id} = body;

    sql = `UPDATE employee
           SET password = '${password}'
            WHERE id = ${id}`

    return dbService.querypromise(sql);
};

module.exports = {
    getAllEmployees,
    getEmployee,
    getEmployeesByOrg,
    getAllDataByOrg,
    addEmployee,
    updatePassword
}