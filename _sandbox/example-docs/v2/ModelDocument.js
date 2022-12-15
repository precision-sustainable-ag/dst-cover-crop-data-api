const { Model } = require("sequelize");
const { CLS:Document } = require('./Document');


class ModelDocument extends Document(Model) {



}

module.exports = { ModelDocument }