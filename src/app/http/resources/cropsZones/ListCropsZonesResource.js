const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { Collection } = require('../../../../framework/resources/Collection');
const { PaginatedCollection } = require('../../../../framework/resources/PaginatedCollection');
const { Crop } = require('../../../models/Crop');
const { CropsZone } = require('../../../models/CropsZone');
const { Family } = require('../../../models/Family');
const { Group } = require('../../../models/Group');
const { Image } = require('../../../models/Image');
const { ListCropResource } = require('../crops/ListCropResource');


const transform = (record) => {
    return record;
}

/**
* Sequelize models to include.
* Written in Sequelize syntax: https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations
*/
const includes = [
    
];

class ListCropsZonesResource extends ListCropResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a list of CropsZone Objects";
    }

    schema(){
        return super.schema();
    }

    build(res,req){
        // res.data = res.data.map(crop => transform(crop)); // transforms each object in list.
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            InternalServerError,
        ]
    }


}

module.exports = {
    ListCropsZonesResource, includes
}