


module.exports = {
    "200":{
        description:"optional descriptor string",
        content: {
            "application/json": {
                schema: {
                    type:"object",
                    properties:{
                        test: {
                            type: "string"
                        }
                    }
                }
            }
        }
    }
}