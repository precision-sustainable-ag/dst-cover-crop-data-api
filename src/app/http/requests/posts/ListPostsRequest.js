const { PaginatedRequest } = require('../PaginatedRequest');

class ListPostsRequest extends PaginatedRequest {

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
    ListPostsRequest
};


