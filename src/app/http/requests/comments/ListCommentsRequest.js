const { PaginatedRequest } = require('../PaginatedRequest');

class ListCommentsRequest extends PaginatedRequest {

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
    ListCommentsRequest
};


