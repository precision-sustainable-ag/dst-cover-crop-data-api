const {Request} = require('./Request');


class RetrieveRequest extends Request {
   
    parameters(){
        return [
            {in:'path',name:'token',schema:{type:'string'},required:true},
        ];
    }

    body(){
        return {

        }
    }

}

module.exports = { RetrieveRequest }