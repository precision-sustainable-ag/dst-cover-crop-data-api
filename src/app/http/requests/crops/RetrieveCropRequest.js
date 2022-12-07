const {Request} = require('../../../../framework/requests/Request');


class RetrieveCropRequest extends Request {
   
    authorized(){
        return true;
    }

    parameters(){
        return [
            {in:'path',name:'id',schema:{type:'integer'},required:true},
        ];
    }

    body(){
        return {};
    }

}

module.exports = { RetrieveCropRequest }