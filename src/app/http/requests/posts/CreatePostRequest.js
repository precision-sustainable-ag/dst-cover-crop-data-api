const { Request } = require('../Request');

class CreatePostRequest extends Request {

    rules(){
        return {
            title: 'required|string',
            body: 'required|string'
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    CreatePostRequest
};


