const request = require('./requests/create');


module.exports = {
    tags: ["examples"],
    summary: "summary of action",
    description: "optional descriptor string",
    ...request,
    responses: {
        "200":{
            description:"optional descriptor string",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            test: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        }
    },
}