const { Crop } = require('../../../models/Crop');
const { EditRequest } = require('../EditRequest');

class UpdateCropRequest extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     * by default no fields will be explicity required for an update.
     */
     model(){
        return Crop;
    }
    
    /**
     * You can add additional rules that will not be resolved by model reflection, 
     * or you can override any rules interpreted from the model class.
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
        }
    }

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
         params(){
            return {
                id: 'string'
            };
        }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    UpdateCropRequest
};


