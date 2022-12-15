const bodyParser = require("body-parser");
const { AjvService } = require("../services/AjvService");
const { StaticDocument } = require("../documents/StaticDocument");


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

    static schema(){
        return this.factory().body();
    }

    content(){
        return 'application/json';
    }

    parser(){
        return bodyParser.urlencoded({extended:true});
    }


    /**
     * follow OpenAPI standards of parameter declaration
     * https://spec.openapis.org/oas/v3.0.0#parameter-object
     */
    parameters(){
        return [

        ];
    }

    /**
     * follow OpenAPI standards for schema declaration 
     * https://spec.openapis.org/oas/v3.0.0#schema-object
     */
    body(){
        return {

        }
    }

    getData(req){
        return {
            params: {
                ...req.params,
                ...req.query,
            },
            body: {
                ...req.body
            }
        }
    }

    validate(){
        const parameters = this.parameters()
        const body = this.body();

        const getData = this.getData;

        return (req, res, next) => {
            console.log('... validating');
            let data = getData(req);

            data = AjvService.Validate({parameters, body, data});
            console.log('validated',data);

            req.validated = data;

            return next();
        }
    }

    buildDocument(){
        const parameters = this.parameters();
        const body = this.body();
        const contentType = this.content();
        const requestBody = {};

        if(Object.keys(body).length > 0) requestBody.content = {
            [contentType]: { schema: body }
        };

        return {
            parameters,
            requestBody
        }
    }


    urlNumberParser(){
        return (req,res,next)=> {
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

}

module.exports = { Request }