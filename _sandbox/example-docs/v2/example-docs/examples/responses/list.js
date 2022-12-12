
module.exports = {
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
}