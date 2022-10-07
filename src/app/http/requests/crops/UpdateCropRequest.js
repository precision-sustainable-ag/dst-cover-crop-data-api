const { RetrieveRequest } = require('../RetrieveRequest');

class UpdateCropRequest extends RetrieveRequest {

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            column: 'string',
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    UpdateCropRequest
};


