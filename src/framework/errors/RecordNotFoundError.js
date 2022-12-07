const {RenderableError} = require('./RenderableError');

class RecordNotFoundError extends RenderableError {

    constructor(data, messages){
        super();
        this.data = data;
        this.messages = messages;
    }

    status(){
        return 404
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Record Not Found";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                data: { type:'object' },
                messages: { type: 'array', items:{type:'string'}}
            }
        }
    }

    build(data){
        data = this.errors;
        return {
            type:'object',
            data,
            messages
        };
    }

}

module.exports =  {
    RecordNotFoundError
}