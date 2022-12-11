const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { Resource } = require('../../../../framework/resources/Resource');
const { Crop } = require('../../../models/Crop');

const { CropsZone } = require('../../../models/CropsZone');
const { Zone } = require('../../../models/Zone');
const {RetrieveCropResource} = require('../crops/RetrieveCropResource');


const transform = (data) => {
    return data;
}

/**
* Sequelize models to include.
* Written in Sequelize syntax: https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations
*/
const includes = [

];

class RetrieveCropsZoneResource extends RetrieveCropResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a CropsZone Object";
    }

    schema(){
        return super.schema();
        return {
            type:'object',
            properties:{
                ...CropsZone.schema({}).properties,
                crop: Crop.schema({}),
                zone: Zone.schema({})
            },
        };
    }

    build(res,req){
        // res.data = transform(res.data); // transform the data
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
    RetrieveCropsZoneResource,
    includes,
}