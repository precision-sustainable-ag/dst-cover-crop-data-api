const request = require('./requests/retrieve-request.js');
const response = require('./responses/example-item-response');

module.exports = {
    tags: ["examples"],
    summary: "summary of action",
    description: "optional descriptor string",
    ...request,
    responses: {
        ...response
    },
}