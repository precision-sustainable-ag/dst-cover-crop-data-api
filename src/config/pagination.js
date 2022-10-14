const {env} = require('./kernel');

module.exports = {
    default: {
        page: 1,
        limit: env.PAGINATION_DEFAULT_LIMIT ?? 10,
        maxLimit: env.PAGINATION_DEFAULT_MAX_LIMIT ?? 500,
    }
}