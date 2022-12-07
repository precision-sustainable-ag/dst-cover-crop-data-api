const { StaticDocument } = require("./StaticDocument");


class Response extends StaticDocument { 

    static [Symbol.hasInstance](obj) {
        if (obj.render && typeof obj.render == 'function') return true;
    }

    static render(){
        const instance = new this();
        const status = instance.status();
        const content = instance.content();
        const formatter = instance.build;
        return (req, res) => {
            console.log('...rendering')
            const data = formatter(res.data);
            res.status(status).type(content).send(data);
        }
    }

    errors(){
        return [
            
        ];  
    }

    build(data){
        return data;
    }

    status(){
        return 200
    }

    content(){
        return "application/json"
    }

    description(){
        return "";
    }

    type(){
        return 'object';
    }

    properties(){
        return {
            id: {type: "integer", required: true,},
            email: {type: "string", required: true, },
        }
    }

    wrapperSchema(){
        const metaSchema = this.metaSchema();
        const type = this.type();
        const data = {type};
        if(type == 'object') data.properties = {};
        else data.items = {};

        const schema = {
            type: 'object',
            properties: {
                type: { type: "string" },
                data,
            }
        }
        
        if(metaSchema && metaSchema.type && (metaSchema.properties || metaSchema.items)){
            schema.properties.meta = metaSchema;
        }

        return schema;
    }

    metaSchema(){
        return {}
    }

    schema(){
        const wrapper = this.wrapperSchema();
        const properties = this.properties();
        const type = this.type();

        if(type == 'object'){
            wrapper.properties.data.properties = properties;
        }
        else {
            wrapper.properties.data.items = {
                type:'object',
                properties
            }
        }
        return wrapper;
    }

    buildDocument() {
        const status = this.status();
        const description = this.description();
        const contentType = this.content();
        const schema = this.schema();
        const content = this.buildContent(schema,contentType);
        return {
            responses: {
                [status] : {
                    description,
                    content
                }
            }
        }
    }

}

module.exports = { Response }