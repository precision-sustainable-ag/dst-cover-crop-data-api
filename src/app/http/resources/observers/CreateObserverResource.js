const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { CreateResource } = require('../../../../framework/resources/CreateResource');
const { Observer } = require('../../../models/Observer');


class CreateObserverResource extends CreateResource {


    status(){
        return 201
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
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    CreateObserverResource
}