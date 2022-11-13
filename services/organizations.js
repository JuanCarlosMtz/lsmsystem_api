const dbService = require('../config/db.js');

const getAllOrgs = () => {
    sql = `SELECT * FROM organization`

    return dbService.querypromise(sql);

};

const verifyOrg = (body) => {

    const {companycode} = body;

    sql = `SELECT name FROM organization
    WHERE companycode = '${companycode}'`

    return dbService.querypromise(sql);
};

const addOrg = (body) => {
    const {name, companycode, reg_date} = body;

    sql = `INSERT INTO organization (name, companycode, reg_date) VALUES ('${name}', '${companycode}', now())`

    return dbService.querypromise(sql);
}


module.exports = {
    getAllOrgs,
    verifyOrg,
    addOrg
}