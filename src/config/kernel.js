const dotenv = require('dotenv')

const env = dotenv.config({path:__dirname+'/./../../.env'})?.parsed;

module.exports =  {
    env, default: env
};