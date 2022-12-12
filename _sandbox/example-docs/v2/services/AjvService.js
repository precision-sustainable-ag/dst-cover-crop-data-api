const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const { UnprocessableEntity } = require("../../../../src/app/exceptions/UnprocessableEntity");


class AjvService {

    static FormatOpenAPISchema(_schema){
        const schema = {..._schema};
        
    }

    static GetValidator(){

        const ajv = new Ajv({allErrors:true});
        addFormats(ajv);
        return ajv;
    }

    static Validate({schema,data}){
        const validator = this.GetValidator();
        const valid = validator.validate(schema, data);

        if(!valid){
            console.log('INVALID DATA')
            const error = new Error();
            error.render = (res) => { res.send({data,schema,errors:validator.errors})};
            throw error;
        }

        return data;
    }

}

module.exports = {
    AjvService
}