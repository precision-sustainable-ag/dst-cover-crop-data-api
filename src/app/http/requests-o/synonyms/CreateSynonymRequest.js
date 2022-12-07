const { Synonym } = require('../../../models/Synonym');
const { EditRequest } = require('../EditRequest');

class CreateSynonymRequest extends EditRequest {
    
    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
            cropId: 'integer'
        };
    }

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     */
    model(){
        return Synonym;
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
    CreateSynonymRequest
};


