const bodyParser = require("body-parser");
const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true})

const addFormats = require("ajv-formats")
addFormats(ajv)


class Request {


    content() {
        return 'application/json'
    }

    /**
     * @returns (req,res,next)=>{...; next();} that parses incoming data.
     */
    parser(){
        return bodyParser.json();
    }

    path(){
        return {
            properties:{
                id: {type: ["string","number"], format:"int64", description:""},
            },
            required:["id"],
        }
    }

    query(){
        return {
            properties:{
                test: {type: ["string","number"], format:"int64"}
            },
            required:[],
        }
    }

    body(){
        return {
            properties:{},
            required:[],
        }
    }

    schema(){
        const path = this.path();
        const query = this.query();
        const body = this.body();

        return {
            type: "object",
            properties: {
                ...path.properties,
                ...query.properties,
                ...body.properties
            },
            required: [...new Set([...path.required,...query.required,...body.required])],
            additionalProperties: false
        }

        // console.log('schema builder',schema);
    }

    getData(req){
        return {
            ...req.params,
            ...req.query,
            ...req.body
        }
    }

    /**
     * this MUST append validated property to req object before calling next.
     * @return (req,res,next)=>{...; next();}
     * @throws validation error
     */
    validate(){
        const schema = this.schema();
        const getData = this.getData;
        return async (req, res, next) => {
            const data = getData(req);
            const valid = ajv.validate(schema, data);
            console.log('data:',data);
            console.log('schema:',schema);
            console.log('valid:',valid);
            if (!valid) {
                console.log('errors',ajv.errors);
                next(new Error("failed validation"));
            }
            else req.validated = data;
            next();
        }
    }

    /**
     * @return [(req,res,next)=>{...; next();}]
     */
    static handle(){
        const instance = new this();
        return [
            instance.parser(),
            instance.validate(),
        ]
    }


    /**
     * 
     * @returns parameters array
     * 
     * parameters: [
     *  {
     *      in: "path" / "query",
     *      name: "param-key",
     *      schema: {
     *          type: "data-type"
     *      },
     *      required: true / false,
     *      description: ''
     *  }
     * ]
     * 
     * path :
        return {
            properties:{
                id: {type: ["string","number"], format:"int64", description:""},
            },
            required:["id"],
        }
     */
    parameters(){
        const path = this.path();
        const query = this.query();
        const params = [];

        for(let param of path){
            params.push({
                in: 'path',
            })
        }

        return params;
    }



    getRequestBodyBlueprint(){
        const contentType = this.content();
        const schema = this.body();
        if(!schema.type) schema.type = 'object';
        return {
            content: {
                [contentType] : {
                    schema
                }
            }
        }
    }

    getParametersBlueprint(){

    }

    static blueprint(){
        const instance = new this();
        const requestBody = instance.getRequestBodyBlueprint();
        console.log('req body',requestBody, requestBody.content['application/json'].schema);
        return {
            parameters:[],
            requestBody,
        }
    }

}

module.exports = { Request }