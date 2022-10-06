
class Resource {

    object(){
        return 'object';
    }

    constructor({resource,status}){
        this.resource = resource;
        this.status = status;
    }

    getStatus(){
        return this.status ?? 200;
    }



    getResource(req){
        return {
            object:this.object(),
            data: this.resource
        };
    }


    render({res, req}){

        res.status(this.getStatus()).send(this.getResource(req));

    }


}

module.exports =  {
    Resource
};