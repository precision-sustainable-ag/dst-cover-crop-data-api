const request = require('./requests/sample');

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
                        type: "array",
                        items: {
                            type:"object",
                            properties:{
                                sample: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}