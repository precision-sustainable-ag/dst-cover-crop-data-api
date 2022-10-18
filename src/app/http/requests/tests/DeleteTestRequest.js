const { GetRequest } = require('../GetRequest');

class DeleteTestRequest extends GetRequest {

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
    DeleteTestRequest
};

