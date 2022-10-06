const {env} = require('./kernel');

module.exports = {
    default: {
        page: 1,
        limit: env.PAGINATION_DEFAULT_PER_PAGE ?? 10,
        connection: env.AZURE_BLOB_CONNECTION_STRING,
    }
}