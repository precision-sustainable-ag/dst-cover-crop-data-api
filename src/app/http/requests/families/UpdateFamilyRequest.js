const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Family } = require('../../../models/Family');


class UpdateFamilyRequest extends Request {
   
    authorized(){
        return false;
    }

    parser(){
        return bodyParser.json();
    }
    
    /**
     * follow OpenAPI standards of parameter declaration
     * https://spec.openapis.org/oas/v3.0.0#parameter-object
     */
    parameters(){
        return [
            {in:'path',name:'id',schema:{type:'integer'},required:true},
        ];
    }

    /**
     * follow OpenAPI 3.0.0 standards for schema declaration 
     * https://spec.openapis.org/oas/v3.0.0#schema-object
     */
    body(){
        return Family.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { UpdateFamilyRequest }