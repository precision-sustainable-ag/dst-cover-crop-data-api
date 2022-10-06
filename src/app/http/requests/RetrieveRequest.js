const { Request } = require('./Request');

class RetrieveRequest extends Request {

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
            id: 'string'
        };
    }

    getRules(){
        const _rules = {};
        // make all params required.
        const params = this.params();
        for(let [param, dataType] of Object.entries(params)){
            _rules[param] = `required|${dataType}`;
        }

        const rules = this.rules();

        return {
            ..._rules,
            ...rules,
        };
    }

    data(req){
        if(req.method == 'GET'){
            this._data = req.query;
        } else {
            this._data = req.body;
        }
        // inject all params into data.
        const params = this.params();
        for(let key in params){
            this._data[key] = req.params[key];
        }
        return this._data;
    }

}

module.exports = {
    RetrieveRequest
}