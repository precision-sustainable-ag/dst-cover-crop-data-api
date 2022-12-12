---
to: src/app/http/resources/<%= h.inflection.pluralize(name) %>/Delete<%= h.inflection.singularize(Name) %>Resource.js
---


const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { Retrieve<%= h.inflection.singularize(Name) %>Resource } = require('./Retrieve<%= h.inflection.singularize(Name) %>Resource');

const { <%= h.inflection.singularize(Name) %> } = require('../../../models/<%= h.inflection.singularize(Name) %>');


class Delete<%= h.inflection.singularize(Name) %>Resource extends Retrieve<%= h.inflection.singularize(Name) %>Resource {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a <%= h.inflection.singularize(Name) %> Object";
    }

    schema(){
        return <%= h.inflection.singularize(Name) %>.schema({});
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
    Delete<%= h.inflection.singularize(Name) %>Resource
}