const { Image } = require('../../../models/Image');
const { EditRequest } = require('../EditRequest');

class CreateImageRequest extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     */
    model(){
        return Image;
    }

    /**
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
            cropId:'integer'
        };
    }
    

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    CreateImageRequest
};


