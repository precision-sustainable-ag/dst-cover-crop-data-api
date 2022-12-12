const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { RetrieveObserverResource } = require('./RetrieveObserverResource');

const { Observer } = require('../../../models/Observer');


class UpdateObserverResource extends RetrieveObserverResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Observer Object";
    }

    schema(){
        return Observer.schema({});
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
    UpdateObserverResource
}