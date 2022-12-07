const bodyParser = require("body-parser");
const { AjvService } = require("./services/AjvService");
const { StaticDocument } = require("./StaticDocument");


class Request extends StaticDocument {
    
    static handle(){
        const instance = new this()
        return [
            instance.urlNumberParser(),
            instance.parser(),
            instance.validate(),
        ];
    }

    static factory(){
        return new this();
    }

    static [Symbol.hasInstance](obj) {
        if (obj.handle && typeof obj.handle == 'function') return true;
    }

    content(){
        return 'application/json';
    }

    urlNumberParser(){
        return (req,res,next)=>{
            const params = req.params;
            
            console.log('checking numerics',req.params,req.query)
            for(let [key,val] of Object.entries(params)){
              const numeric = Number(val);
              console.log(key,val,numeric)
              if(numeric) req.params[key] = numeric;
            }
          
            const query = req.query;
            for(let [key,val] of Object.entries(query)){
              const numeric = Number(val);
              console.log(key,val,numeric)
              if(numeric) req.query[key] = numeric;
            }
          
            next();
          }
    }

    parser(){
        return bodyParser.urlencoded({extended:true});
    }

    path(){
        return {
            id: {type: "integer", required: true }
        }
    }

    query(){
        return {
            email: {type: "string", required: false, format:"email" } 
        }
    }

    json(){
        return {

        }
    }

    schema(schema){
        if(schema) return this.setSchema(schema);

        if(this._schema) return this._schema;

        const json = this.json();
        const path = this.path();
        const query = this.query();

        const properties = {
            ...path,
            ...query,
            ...json
        };

        const required = [];

        for(let [key, param] of Object.entries(properties)){
            if(param.required) required.push(key);
            delete properties[key].required
        }

        schema = {
            type: "object",
            properties,
            required,
            additionalProperties: false
        }

        return this._schema = schema;
    }

    setSchema(schema){
        this._schema = schema
        return this;
    }

    getData(req){
        return {
            ...req.params,
            ...req.query,
            ...req.body
        }
    }

    validate(){
        const schema = this.schema();
        const getData = this.getData;

        return (req, res, next) => {
            console.log('... validating');
            let data = getData(req);

            data = AjvService.Validate({schema,data});
            req.validated = data;
            console.log('validated',data);
            return next();
        }
    }


    buildDocument(){
        const path = this.path();
        const query = this.query();
        const json = this.json();
        const contentType = this.content();

        const parameters = [
            ...this.buildParameters({location:'path',properties:path}),
            ...this.buildParameters({location:'query', properties:query})
        ];

        const content = this.buildContent({type:'object',properties:json}, contentType)
        
        const requestBody = {content};

        return {
            parameters,
            requestBody
        }
    }


}

module.exports = { Request }