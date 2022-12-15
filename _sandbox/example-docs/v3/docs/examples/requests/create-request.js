
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
    requestBody: {
        content: {
            "application/json": {
                description: "object",
                schema: {
                    type:"object",
                    required: ["test"],
                    properties:{
                        test: {type:"string"},
                        description: {type:"string"},
                    }
                }
            }
        }
    },
}