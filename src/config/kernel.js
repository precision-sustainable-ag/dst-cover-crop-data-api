const dotenv = require('dotenv')
const { app_path } = require('../app/support/helpers/path');

const env = dotenv.config()?.parsed;

module.exports =  {
    env, default: env
};