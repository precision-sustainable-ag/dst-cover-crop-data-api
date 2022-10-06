const { RetrieveRequest } = require('../RetrieveRequest');

class UpdateCommentRequest extends RetrieveRequest {

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
    UpdateCommentRequest
};


