const { Collection } = require('./Collection');

class PaginatedCollection extends Collection {

    object(){
        return 'paginated';
    }

    constructor({resource,status,count}){
        super({resource,status});
        this.count = count;
    }

    getResource(req){
        const records = this.count;
        const limit = req.validated.limit;
        return {
            object:this.object(),
            data: this.resource,
            meta: {
                page: req.validated.page,
                limit,
                records,
                pages: Math.ceil(records/limit),
            }
        };
    }

}

module.exports =  {
    PaginatedCollection
};