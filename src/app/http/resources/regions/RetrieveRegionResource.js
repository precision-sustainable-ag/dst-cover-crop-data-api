const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { Resource } = require('../../../../framework/resources/Resource');

const { Region } = require('../../../models/Region');


const transform = (data) => {
    return data;
}

/**
* Sequelize models to include.
* Written in Sequelize syntax: https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations
*/
const includes = [

];

class RetrieveRegionResource extends Resource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Region Object";
    }

    schema(){
        return Region.schema({});
    }

    build(res,req){
        res.data = transform(res.data);
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            RecordNotFoundError,
            InternalServerError,
        ]
    }


}

module.exports = {
    RetrieveRegionResource,
    includes,
}