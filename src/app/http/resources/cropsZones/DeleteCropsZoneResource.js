const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { RetrieveCropsZoneResource } = require('./RetrieveCropsZoneResource');

const { CropsZone } = require('../../../models/CropsZone');


class DeleteCropsZoneResource extends RetrieveCropsZoneResource {


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
        return CropsZone.schema({});
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
    DeleteCropsZoneResource
}