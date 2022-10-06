const { GetRequest } = require('../GetRequest');

class RetrievePostRequest extends GetRequest {

    rules(){
        return {
        }
    }
    
    // return true to by-pass need for authorization
    authorized(){
        return true;
    }
}

module.exports =  {
    RetrievePostRequest
};


