const list = require('./list');
const retrieve = require('./retrieve');
const create = require('./create');

const BASE_PATH = '/examples'
const RESOURCE_PATH = `${BASE_PATH}/{id}`

module.exports = {
    [BASE_PATH]: {
        get:list,
        post:create
    },
    [RESOURCE_PATH]:{
        get: retrieve
    }
}