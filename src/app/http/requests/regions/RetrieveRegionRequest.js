const { GetRequest } = require('../GetRequest');

class RetrieveRegionRequest extends GetRequest {

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
    RetrieveRegionRequest
};


