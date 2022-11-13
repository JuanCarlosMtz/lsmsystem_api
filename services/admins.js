const dbService = require('../config/db.js');

const getAllAdmins = () => {
    sql = `SELECT * FROM administrator`

    return dbService.querypromise(sql);

};

const getAdmin = (username) => {

    sql = `SELECT * FROM administrator
    WHERE username = '${username}'`

    return dbService.querypromise(sql);
};

const addAdmin = (body) => {
    const {firstname, lastname, email, password, companycode, reg_date, organizationid} = body;

    sql = `INSERT INTO administrator (firstname, lastname, email, password, companycode, reg_date) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${companycode}', now())`

    return dbService.querypromise(sql);
};

const updatePassword = (body) => {

    const {password, id} = body;

    sql = `UPDATE administrator
           SET password = '${password}'
            WHERE id = ${id}`

    return dbService.querypromise(sql);
};

module.exports = {
    getAllAdmins,
    getAdmin,
    addAdmin,
    updatePassword
}