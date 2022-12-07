const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const { UnprocessibleEntityError } = require("../errors/UnprocessibleEntityError");


class AjvService {

    static FormatOpenAPISchema({parameters, body={}}){
        const required = [];
        const properties = {};

        for(let param of parameters){
            properties[param.name] = param.schema;
            if(param.required) required.push(param.name);
        }

        const schema = {
            type: "object",
            properties: {
                params: {
                    type:'object',
                    properties,
                    required
                },
                body,
            },
        }
        console.log('Validation Schema:',schema);
        return schema;
    }

    static GetValidator(){

        const ajv = new Ajv({allErrors:true});
        addFormats(ajv);
        return ajv;
    }

    static Validate({schema,parameters, body, data}){
        const validator = this.GetValidator();

        if(!schema) schema = this.FormatOpenAPISchema({parameters,body});

        const valid = validator.validate(schema, data);

        if(!valid){
            console.log('INVALID DATA')
            throw new UnprocessibleEntityError(data, {parameters,body}, validator.errors);
        }

        return data;
    }

}

module.exports = {
    AjvService
}