const { PaginatedRequest } = require('../PaginatedRequest');

class ListImagesRequest extends PaginatedRequest {

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
        }
    }


    params(){
        return {
            cropId:'integer',
        }
    }
    
    // return true to by-pass need for authorization
    authorized(){
        return false;
    }
}

module.exports =  {
    ListImagesRequest
};


