const dbService = require('../config/db.js');

const getAllOrgs = () => {
    sql = `SELECT * FROM organization`

    return dbService.querypromise(sql);

};

const getOrg = (name) => {

    sql = `SELECT * FROM organization
    WHERE name = '${name}'`

    return dbService.querypromise(sql);
};

const addOrg = (body) => {
    const {name, companycode, reg_date} = body;

    sql = `INSERT INTO organization (name, companycode, reg_date) VALUES ('${name}', '${companycode}', now())`

    return dbService.querypromise(sql);
}


module.exports = {
    getAllOrgs,
    getOrg,
    addOrg
}