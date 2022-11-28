const dbService = require('../config/db.js');

const getAllAdmins = () => {
    sql = `SELECT id, username, email, reg_date, organizationid FROM administrator`

    return dbService.querypromise(sql);

};

const getAdmin = (username) => {

    sql = `SELECT id, username, email, reg_date, organizationid FROM administrator
    WHERE username = '${username}'`

    return dbService.querypromise(sql);
};

const getPassword = (username) => {

    sql = `SELECT password FROM administrator WHERE username = '${username}'`

    return dbService.querypromise(sql);
}

const addAdmin = (body) => {
    const {username, email, password, companycode, organizationid} = body;

    sql = `INSERT INTO administrator (username, email, password, companycode, reg_date, organizationid) VALUES ('${username}', '${email}', '${password}', '${companycode}', now(), ${organizationid})`

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
    getPassword,
    addAdmin,
    updatePassword
}