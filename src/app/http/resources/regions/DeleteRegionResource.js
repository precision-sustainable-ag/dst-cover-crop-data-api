const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { RetrieveRegionResource } = require('./RetrieveRegionResource');
const { Region } = require('../../../models/Region');


class DeleteRegionResource extends RetrieveRegionResource {


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
    DeleteRegionResource
}