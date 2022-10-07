---
to: app/http/requests/<%= h.inflection.pluralize(name) %>/Update<%= h.inflection.singularize(Name) %>Request.js
---

const { RetrieveRequest } = require('../RetrieveRequest');

class Update<%= h.inflection.singularize(Name) %>Request extends RetrieveRequest {

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            column: 'string',
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    Update<%= h.inflection.singularize(Name) %>Request
};


