---
to: app/http/requests/<%= h.inflection.pluralize(name) %>/Create<%= h.inflection.singularize(Name) %>Request.js
---

const { Request } = require('../Request';

export class Post<%= h.inflection.singularize(Name) %>Request extends Request {

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            column: 'required|string',
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  Post<%= h.inflection.singularize(Name) %>Request;


