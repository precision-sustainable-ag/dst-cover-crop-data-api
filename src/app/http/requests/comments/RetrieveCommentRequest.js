const { GetRequest } = require('../GetRequest');

class RetrieveCommentRequest extends GetRequest {

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
    RetrieveCommentRequest
};


