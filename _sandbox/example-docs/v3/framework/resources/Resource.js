
const { BadRequestError } = require('../errors/BadRequestError');
const { UnprocessibleEntityError } = require('../errors/UnprocessibleEntityError');
const { Example } = require('../models/Example');
const { CreateRequest } = require('../requests/CreateRequest');
const {Response} = require('../responses/Response');


class Resource extends Response {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "";
    }

    schema(){
        // return Example.schema({})
        return {
            type: 'object',
            properties: {
                question:{type:"string"},
                answers: {type:'array',items:{type:'string'}}
            }
        }
    }

    build(data){
        return data;
    }

    errors(){
        return [
            BadRequestError,
            UnprocessibleEntityError
        ];  
    }

    buildDocument() {
        const errors = this.errors();
        const document = super.buildDocument();
        for(let error of errors){
            const errDocument = error.document()
            if(errDocument?.responses) document.responses = {
                ...document.responses,
                ...errDocument.responses
            }
        }
        console.log(document.responses["200"].content["application/json"].schema);
        return document;
    }


}

module.exports = {
    Resource
}