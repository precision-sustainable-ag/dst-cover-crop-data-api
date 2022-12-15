const { Model } = require("./Model");

class Resource {

    static type(){
        return 'object';
    }

    static content(){
        return 'application/json'
    }

    static status(){
        return 200;
    }

    static description(){
        return 'OK';
    }

    static schema(){
        return Model.schema({});
    }

    static blueprint(){
        const status = this.status();
        const description = this.description();
        const contentType = this.content();
        const schema = this.schema();
        const blueprint = {
            [status]: {
                description,
                content:{
                    [contentType]: {
                        schema: {
                            type:"object",
                            properties:{
                                type: {type:"string"},
                                data: {type:"object",properties:{...schema.properties}}
                            }
                        }
                    }
                }
            }
        };
        return blueprint;
    }

    static build(req,res){
        const meta = this.getMeta(req);
        const object = this.object();
        const data = this.res.data;
        const schema = this.schema();


        const valid = ajv.validate(schema, data);
        
        if(!valid) throw new Error("internal server error");

        return {
            object,
            data,
            meta
        };
    }


    static render(req,res){

        const content = this.build(req, res);

        res.status(this.getStatus())
            .type(this.content())
            .send(content);

    }


}

module.exports =  {
    Resource
};