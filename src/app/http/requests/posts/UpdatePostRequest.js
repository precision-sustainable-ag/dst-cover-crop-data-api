const { RetrieveRequest } = require('../RetrieveRequest');

class UpdatePostRequest extends RetrieveRequest {

    rules(){
        return {
            title: 'string',
            body: 'string'
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    UpdatePostRequest
};


