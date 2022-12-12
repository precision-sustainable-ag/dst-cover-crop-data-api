module.exports = {
    parameters: [
        {
            in: "query",
            name: "sample",
            required: false,
            description: "optional descriptor string",
            schema: {
                type: "string"
            }
        }
    ], 
    requestBody: {},
}