---
to: src/app/http/resources/<%= h.inflection.pluralize(name) %>/Create<%= h.inflection.singularize(Name) %>Resource.js
---


const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { CreateResource } = require('../../../../framework/resources/CreateResource');
const { <%= h.inflection.singularize(Name) %> } = require('../../../models/<%= h.inflection.singularize(Name) %>');


class Create<%= h.inflection.singularize(Name) %>Resource extends CreateResource {


    status(){
        return 201
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
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    Create<%= h.inflection.singularize(Name) %>Resource
}