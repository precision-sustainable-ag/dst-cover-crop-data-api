const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { RetrieveGroupResource } = require('./RetrieveGroupResource');

const { Group } = require('../../../models/Group');


class UpdateGroupResource extends RetrieveGroupResource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Group Object";
    }

    schema(){
        return Group.schema({});
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
    UpdateGroupResource
}