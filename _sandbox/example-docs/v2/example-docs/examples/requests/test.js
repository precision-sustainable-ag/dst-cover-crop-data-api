module.exports = {
    parameters: [
        {
            in: "query",
            name: "test",
            required: false,
            description: "optional descriptor string",
            schema: {
                type: "string"
            }
        }
    ], 
    requestBody: {},
}