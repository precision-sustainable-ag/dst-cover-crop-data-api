const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Group } = require('../../../models/Group');


class CreateGroupRequest extends Request {
   
    authorized(){
        return false;
    }

    strict(){
        return true;
    }

    filtered(){
        return true;
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
        return Group.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { CreateGroupRequest }