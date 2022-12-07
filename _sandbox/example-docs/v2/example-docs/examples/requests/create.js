

module.exports = {
    parameters: [], 
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        question: {
                            type: "string",
                        },
                        answers: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                },
                examples: {
                    dnm: {
                        summary: "Example 1",
                        value: {
                            question: "what is life?",
                            answers: [
                                42,
                                "action through non-action, living in accordance with the way", 
                                "the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.",
                            ]
                        }
                    }
                }
            }
        }
    },
}