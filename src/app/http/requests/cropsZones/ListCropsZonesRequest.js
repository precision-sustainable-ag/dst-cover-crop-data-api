const { PaginatedRequest } = require('../PaginatedRequest');

class ListCropsZonesRequest extends PaginatedRequest {

       /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
            zoneId: 'integer'
        };
    }
    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
        }
    }
    
    // return true to by-pass need for authorization
    authorized(){
        return false;
    }
}

module.exports =  {
    ListCropsZonesRequest
};


