const list = require('./get');
const retrieve = require('./retrieve');
const post = require('./post');

const path = "/examples";
const path2 = "/examples/:id";

module.exports = {
    [path]: {
        get:list,
        post
    },
    [path2]:{
        get:retrieve
    }
}