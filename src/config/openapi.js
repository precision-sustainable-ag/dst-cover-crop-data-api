

module.exports = {
    openapi: "3.0.0",
    info: {
        title: "Sample API",
        description: "optional descriptor string",
        version: "4.0.4"
    },
    servers: [
        {url:"http://localhost:3000", description: "development"},
        {url:"http://localhost:3000", description: "production"},
    ],
    paths: {}
}