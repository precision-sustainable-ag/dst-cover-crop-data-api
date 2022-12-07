const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true})

const addFormats = require("ajv-formats")
const { Crop } = require("../../src/app/models/Crop")
addFormats(ajv)

const schema = {
  type: "object",
  properties: {
    foo: {type: "number",},
    bar: {type: "string", format: "date"},
    baz: {type:'array',items:{type:'object',properties:{foo:{type:'string'}}}}
  },
  required: ["foo", "baz.*.bar"],
  additionalProperties: false
}

const cropSchema = Crop.schema();

schema.properties = {
    ...schema.properties,
    // ...cropSchema.properties,
}
// schema.required = [...new Set([...schema.required,...cropSchema.required])]

// console.log('comp',schema)

const data = { bar: "2022-01-01"}
const valid = ajv.validate(schema, data)
if (!valid) console.log('errors',ajv.errors)
else console.log('valid!')