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

    data(req) {
        req.query.page = req.query.page ?? pag_conf.default.page;
        req.query.limit = req.query.limit ?? pag_conf.default.limit;
        return this._data = req.query;
    }

}

module.exports = {
    PaginatedRequest
}