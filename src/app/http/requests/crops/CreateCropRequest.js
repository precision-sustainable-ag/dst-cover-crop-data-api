const bodyParser = require('body-parser');
const {Request} = require('../../../../framework/requests/Request');
const { Crop } = require('../../../models/Crop');


class CreateCropRequest extends Request {
   
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
            
        ];
    }

    body(){
        return Crop.schema({exclude:[{prop:'autoIncrement',value:true}]});
    }

}

module.exports = { CreateCropRequest }