const {RenderableError} = require('./RenderableError')

class BadRequestException extends RenderableError {


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

    wrapper(){
        return {};
    }

    build(data){
        return {};
    }

}

module.exports =  {
    BadRequestException
}