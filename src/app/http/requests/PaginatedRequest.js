const { GetRequest } = require('./GetRequest');
const pag_conf = require('../../../config/pagination');

class PaginatedRequest extends GetRequest {

    static defaultRules(){
        return {
            page: 'required|integer',
            limit: 'required|integer'
        }
    }

    getRules(){
        const rules = this.rules();
        return {
            ...PaginatedRequest.defaultRules(),
            ...rules,
        };
    }

    convertToInt(val, defaultVal = 0){
        if(!val) return defaultVal;
        try{
            return parseInt(val);
        } catch(err){
            return defaultVal;
        }
    }

    data(req) {

        req.query.page = this.convertToInt(req.query.page, pag_conf.default.page);
        req.query.limit = this.convertToInt(req.query.limit, pag_conf.default.limit);

        return this._data = req.query;
    }

}

module.exports = {
    PaginatedRequest
}