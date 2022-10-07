const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const { RetrieveRequest } = require('./RetrieveRequest');

class EditRequest extends RetrieveRequest {


    model(){
        return null;
    }
    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
        };
    }

    getModelRules(){
        const rules = {};
        const model = this.model();
        const attributes = model.attributes();

        for(let [attribute, properties] of Object.entries(attributes)) {
            if(properties.primaryKey) continue;
            const dataType = ValidatorProvider.factory().ConvertDataTypeToRule(properties.type);
            const required = properties.allowNull ? 'required|' : '';
            rules[attribute] = `${required}${dataType}`;
        }
        
        console.log('>>>> Model Rules',rules)
        return rules;
    }

    getRules(){
        const rules = this.rules();
        const paramRules = this.getParamRules();
        const modelRules = this.getModelRules();

        return {
            ...modelRules,
            ...paramRules,
            ...rules,
        };
    }

    data(req){
        this._data = req.body;
        // inject all params into data.
        const params = this.params();

        for(let key in params){
            this._data[key] = req.params[key];
        }

        return this._data;
    }

}

module.exports = {
    EditRequest
}