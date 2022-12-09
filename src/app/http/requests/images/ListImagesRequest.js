const { PaginatedRequest } = require('../../../../framework/requests/PaginatedRequest');


class ListImagesRequest extends PaginatedRequest {
   
    authorized(){
        return false;
    }
    
    /**
     * follow OpenAPI standards of parameter declaration
     * https://spec.openapis.org/oas/v3.0.0#parameter-object
     */
    parameters(){
        return [
            {in:'path',name:'cropId',schema:{type:'integer'},required:true},
            ...super.parameters(),
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

module.exports = { ListImagesRequest }