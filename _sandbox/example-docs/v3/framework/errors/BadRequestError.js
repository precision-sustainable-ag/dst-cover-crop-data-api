const {RenderableError} = require('./RenderableError');

class BadRequestError extends RenderableError {


    status(){
        return 400
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Bad Request";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                key:{type:"string"},
                messages: {type:'array',items:{type:'string'}}
            }
        }
    }

    build(data){
        data = this.errors;
        return {
            type:'object',
            ...data,
        };
    }

}

module.exports =  {
    BadRequestError
}