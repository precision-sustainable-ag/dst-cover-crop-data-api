const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Synonym } = require('../../../models/Synonym');


class CreateSynonymRequest extends Request {
   
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
            
        ];
    }

    /**
     * follow OpenAPI 3.0.0 standards for schema declaration 
     * https://spec.openapis.org/oas/v3.0.0#schema-object
     */
    body(){
        return Synonym.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { CreateSynonymRequest }