const { PaginatedRequest } = require('../../../../framework/requests/PaginatedRequest');
const { Family } = require('../../../models/Family');
const { Group } = require('../../../models/Group');

const includes = [
    Family, Group
];

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

module.exports = { ListCropsRequest, includes }