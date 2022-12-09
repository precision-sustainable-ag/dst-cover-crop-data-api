const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { RetrieveZoneResource } = require('./RetrieveZoneResource');

const { Zone } = require('../../../models/Zone');


class DeleteZoneResource extends RetrieveZoneResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Zone Object";
    }

    schema(){
        return Zone.schema({});
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
    DeleteZoneResource
}