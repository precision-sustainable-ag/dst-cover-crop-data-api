const { Resource } = require('./Resource');

class Collection extends Resource {

    object(){
        return 'array';
    }

    constructor({resource,status}){
        super({resource,status});
        if(!(this.resource instanceof Array)) this.resource = [this.resource];
    }


}

module.exports =  {
    Collection
};