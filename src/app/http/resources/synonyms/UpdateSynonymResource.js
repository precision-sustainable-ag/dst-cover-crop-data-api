const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { RetrieveSynonymResource } = require('./RetrieveSynonymResource');

const { Synonym } = require('../../../models/Synonym');


class UpdateSynonymResource extends RetrieveSynonymResource {


    status(){
        return 200
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
            RecordNotFoundError,
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    UpdateSynonymResource
}