const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { RetrieveCropResource } = require('./RetrieveCropResource');
const { Crop } = require('../../../models/Crop');


class DeleteCropResource extends RetrieveCropResource {


    status(){
        return 200
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
    DeleteCropResource
}