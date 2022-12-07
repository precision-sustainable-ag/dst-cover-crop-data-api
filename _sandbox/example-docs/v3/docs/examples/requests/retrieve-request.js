
module.exports = {
    parameters: [
        {
            in: "path",
            name: "id",
            required: true,
            description: "optional descriptor string",
            schema: {
                type: "integer",
                format: "int64"
            }
        }
    ], 
    requestBody: {},
}