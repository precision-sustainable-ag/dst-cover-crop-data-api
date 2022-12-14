const {Request} = require('../../../../framework/requests/Request');


class DeleteSynonymRequest extends Request {
   
    authorized(){
        return false;
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
            {in:'path',name:'id',schema:{type:'integer'},required:true},
        ];
    }

    /**
     * follow OpenAPI 3.0.0 standards for schema declaration 
     * https://spec.openapis.org/oas/v3.0.0#schema-object
     */
    body(){
        return {};
    }

}

module.exports = { DeleteSynonymRequest }