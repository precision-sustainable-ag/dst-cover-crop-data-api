const { PaginatedRequest } = require('../PaginatedRequest');

class ListCropsRequest extends PaginatedRequest {

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            label: 'string',
        }
    }
    
    // return true to by-pass need for authorization
    authorized(){
        return false;
    }
}

module.exports =  {
    ListCropsRequest
};


