const { GetRequest } = require('../GetRequest');

class DeleteCommentRequest extends GetRequest {

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
    DeleteCommentRequest
};


