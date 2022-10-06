
const dotenv = require('dotenv')
const { app_path } = require('../app/support/helpers/path');

const env = dotenv.config({path:app_path('.env')})?.parsed;

module.exports =  {
    env, default: env
};