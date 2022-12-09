const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { RetrieveFamilyResource } = require('./RetrieveFamilyResource');

const { Family } = require('../../../models/Family');


class DeleteFamilyResource extends RetrieveFamilyResource {


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
            InternalServerError,
        ]
    }


}

module.exports = {
    DeleteFamilyResource
}