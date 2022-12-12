const bodyParser = require("body-parser");
const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true})

const addFormats = require("ajv-formats")
addFormats(ajv)


class Request {


    content() {
        'application/json'
    }

    /**
     * @returns (req,res,next)=>{...; next();} that parses incoming data.
     */
    parser(){
        return bodyParser.json();
    }

    path(){
        return {
            properties:{},
            required:[],
        }
    }

    query(){
        return {
            properties:{},
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
        const schema = {
            type: "object",
            properties: {
                ...path.parameters,
                ...query.parameters,
                ...body.parameters
            },
            required: [...new Set([...path.required,...query.required,...body.required])],
            additionalProperties: false
        }


    }

    /**
     * this MUST append validated property to req object before calling next.
     * @return (req,res,next)=>{...; next();}
     * @throws validation error
     */
    async validate(){

    }

    /**
     * @return [(req,res,next)=>{...; next();}]
     */
    async handle(){
        return [
            this.validate(),
        ]
    }

}

module.exports = { Request }