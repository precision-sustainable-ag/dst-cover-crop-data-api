const { CropsZone } = require('../../../models/CropsZone');
const { EditRequest } = require('../EditRequest');

class CreateCropsZoneRequest extends EditRequest {
    
    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
     params(){
        return {
            zoneId: 'integer',
            cropId: 'integer'
        };
    }
    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     */
    model(){
        return CropsZone;
    }

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
            poop:'string'
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    CreateCropsZoneRequest
};


