const { GetRequest } = require('./GetRequest');
const pag_conf = require('../../../config/pagination');

class PaginatedRequest extends GetRequest {

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
     params(){
        return {

        };
    }

    static defaultRules(){
        return {
            page: 'required|integer',
            limit: 'required|integer'
        }
    }

    getRules(req){
        const rules = this.rules();
        const paramRules = this.getParamRules();

        req.query.page = this.convertToInt(req.query.page, pag_conf.default.page);
        req.query.limit = this.convertToInt(req.query.limit, pag_conf.default.limit);

        return {
            ...PaginatedRequest.defaultRules(),
            ...paramRules,
            ...rules,
        };
    }

    convertToInt(val, defaultVal = 0){
        if(val == '*'){ return null; }
        if(!val) return defaultVal;
        try{
            return parseInt(val);
        } catch(err){
            return defaultVal;
        }
    }

}

module.exports = {
    PaginatedRequest
}