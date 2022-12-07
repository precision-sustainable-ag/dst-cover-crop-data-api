module.exports = {
    parameters: [
        {
            in: "path",
            name: "id",
            required: true,
            description: "record id",
            schema: {
                type: ["string","integer"],
                format: ["int64"]
            }
        }
    ], 
    requestBody: {},
}