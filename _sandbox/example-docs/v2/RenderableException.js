const { ErrorDocument } = require("./ErrorDocument");

class RenderableException extends ErrorDocument {

    constructor({errors}){
        this.errors = errors;
    }


    description(){
        return "Bad Request";
    }


    status(){
        return 400;
    }

    content(){
        return "application/json"
    }

    properties(){
        return {
            errors: {
                type:'array',
                items: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string"
                        },
                        messages: {
                            type: 'array',
                            items: {type:'string'}
                        }
                    }
                }
            }
        }
    }

    buildDocument(){
        const status = this.status();
        const description = this.description();
        const contentType = this.content();
        const properties = this.properties();
        const content = this.buildContent({schema:properties});
        return {
            [status] : {
                description,
                content
            }
        }
    }
}

module.exports =  {
    RenderableException
}