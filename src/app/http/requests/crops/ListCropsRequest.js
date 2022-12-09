const { PaginatedRequest } = require('../../../../framework/requests/PaginatedRequest');



class ListCropsRequest extends PaginatedRequest {
   
    authorized(){
        return true;
    }

    parameters(){
        return [
            ...super.parameters(),
            {in:'query',name:'label',schema:{type:'string'}},
        ];
    }

    body(){
        return {};
    }

}

module.exports = { ListCropsRequest }