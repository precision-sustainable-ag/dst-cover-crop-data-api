const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { CreateResource } = require('../../../../framework/resources/CreateResource');
const { Synonym } = require('../../../models/Synonym');


class CreateSynonymResource extends CreateResource {


    status(){
        return 201
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Synonym Object";
    }

    schema(){
        return Synonym.schema({});
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
    CreateSynonymResource
}