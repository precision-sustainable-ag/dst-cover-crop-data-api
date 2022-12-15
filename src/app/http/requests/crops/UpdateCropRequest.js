const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Crop } = require('../../../models/Crop');


class UpdateCropRequest extends Request {
   
    authorized(){
        return false;
    }

    strict(){
        return true;
    }

    filtered(){
        return true;
    }
    

    parser(){
        return bodyParser.json();
    }

    parameters(){
        return [
            {in:'path',name:'id',schema:{type:'integer'},required:true},
        ];
    }

    body(){
        return Crop.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { UpdateCropRequest }