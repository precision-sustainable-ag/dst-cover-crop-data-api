---
to: src/app/http/requests/<%= h.inflection.pluralize(name) %>/Create<%= h.inflection.singularize(Name) %>Request.js
---


const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { <%= h.inflection.singularize(Name) %> } = require('../../../models/<%= h.inflection.singularize(Name) %>');


class Create<%= h.inflection.singularize(Name) %>Request extends Request {
   
    authorized(){
        return false;
    }

    parser(){
        return bodyParser.json();
    }

    strict(){
        return true;
    }

    filtered(){
        return true;
    }
    
    /**
     * follow OpenAPI standards of parameter declaration
     * https://spec.openapis.org/oas/v3.0.0#parameter-object
     */
    parameters(){
        return [
            
        ];
    }

    /**
     * follow OpenAPI 3.0.0 standards for schema declaration 
     * https://spec.openapis.org/oas/v3.0.0#schema-object
     */
    body(){
        return <%= h.inflection.singularize(Name) %>.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { Create<%= h.inflection.singularize(Name) %>Request }