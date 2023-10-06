const pgp = require('pg-promise')();




const dbConfig = {
  // host: 'postgres',
  host: 'postgres',
  port: '5432',
  database: 'test_db',
  user: 'postgres',
  password: 'changeme',
};
// const dbConfig = {
//   host: process.env.DB_SERVER,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// };

const db = pgp(dbConfig);

module.exports = db;
