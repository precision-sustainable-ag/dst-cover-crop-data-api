const { GetRequest } = require('../GetRequest');

class RetrieveCropsZoneRequest extends GetRequest {
    
    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
     params(){
        return {
            zoneId: 'integer',
            cropId: 'integer'
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
    RetrieveCropsZoneRequest
};


