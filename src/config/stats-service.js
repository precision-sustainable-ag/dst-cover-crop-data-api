const {env} = require('./kernel');

/**
 * please visit documentation for more information on cors package
 * https://www.npmjs.com/package/cors
 */
module.exports =  {
    url: env?.STATS_SERVICE_URL ?? 'https://developstats.covercrop-data.org',
}