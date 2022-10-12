const { Zone } = require('../../../models/Zone');
const { EditRequest } = require('../EditRequest');

class UpdateZoneRequest extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     * by default no fields will be explicity required for an update.
     */
    model(){
        return Zone;
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
    UpdateZoneRequest
};

