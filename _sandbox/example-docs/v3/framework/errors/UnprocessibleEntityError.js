const {RenderableError} = require('./RenderableError');


class UnprocessibleEntityError extends RenderableError {

    constructor(data, schema, errors){
        super();
        this.body = { data, schema, errors }
    }

    status(){
        return 422
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Unprocessible Entity";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                type:{type:'string'},
                data:{type:"object"},
                schema: {
                    type: 'object',
                    properties: {
                        parameters: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    in: {type:'string'},
                                    name: {type:'string'},
                                    required: {type:'boolean'},
                                    schema: {type: ['object','array','string']}
                                }
                            }
                        },
                        body:{
                            type:['object','array'],
                        }
                    }
                },
                errors: {
                    type: 'array',
                    items: {
                        type:'object',
                        properties: {
                            instancePath: {type:'string'},
                            schemaPath: {type:'string'},
                            keyword: {type:'string'},
                            params: {type:'object'},
                            message: {type:'string'}
                        }
                    }
                }
            }
        }
    }

    wrapper(){
        return this.schema();
    }


    build(data){
        data = this.body;
        return {
            type:'object',
            ...data,
        };
    }

}

module.exports =  {
    UnprocessibleEntityError
}