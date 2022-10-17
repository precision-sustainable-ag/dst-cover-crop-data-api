const {Sequelize} = require('sequelize');
const db_conf = require('../src/config/database');


const database = new Sequelize({
    database: db_conf.database,
    username: db_conf.username,
    password: db_conf.password,
    host: db_conf.host,
    port: db_conf.port ?? 5432,
    dialect: db_conf.connection,
    dialectOptions: {
      ssl: {
        require: db_conf.ssl ?? true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  });


try {
    database.authenticate();
} catch (error) {
    console.log(error);
}