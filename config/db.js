const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        ssl : {
            rejectUnauthorized: false
        }
    }
);

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('DB Connected');
    connection.release();
});

const querypromise = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = {
    pool,
    querypromise
};