const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Observer } = require('../../../models/Observer');


class UpdateObserverRequest extends Request {
   
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
        return Observer.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { UpdateObserverRequest }