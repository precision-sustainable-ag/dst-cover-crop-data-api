
const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { CreateResource } = require('../../../../framework/resources/CreateResource');
const { Crop } = require('../../../models/Crop');


class CreateCropResource extends CreateResource {


    status(){
        return 201
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Crop Object";
    }

    schema(){
        return Crop.schema({});
    }

    build(res,req){
        return res.data;
    }

    errors(){
        return [
            BadRequestError,
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    CreateCropResource
}