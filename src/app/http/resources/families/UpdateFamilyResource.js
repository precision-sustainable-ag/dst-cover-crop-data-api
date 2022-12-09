const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { RetrieveFamilyResource } = require('./RetrieveFamilyResource');

const { Family } = require('../../../models/Family');


class UpdateFamilyResource extends RetrieveFamilyResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Family Object";
    }

    schema(){
        return Family.schema({});
    }

    build(res,req){
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            RecordNotFoundError,
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    UpdateFamilyResource
}