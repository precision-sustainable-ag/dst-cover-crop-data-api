const { GetRequest } = require('../GetRequest');

class RetrieveImageRequest extends GetRequest {

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
            imageId: 'integer',
            cropId: 'integer',
        }
    }
    
    // return true to by-pass need for authorization
    authorized(){
        return false;
    }
}

module.exports =  {
    RetrieveImageRequest
};


