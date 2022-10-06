const {env} = require('./kernel');

module.exports =  {
    connection: env.DB_CONNECTION,
    host:       env.DB_HOST,
    port:       env.DB_PORT,
    username:   env.DB_USERNAME,
    password:   env.DB_PASSWORD,
    database:   env.DB_DATABASE,
    logging:    false, //!!must be either console.log or false.
}