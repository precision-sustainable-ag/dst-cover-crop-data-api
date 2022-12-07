const { Observer } = require('../../../models/Observer');
const { EditRequest } = require('../EditRequest');

class UpdateObserverRequest extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     * by default no fields will be explicity required for an update.
     */
    model(){
        return Observer;
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


    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
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
    UpdateObserverRequest
};


