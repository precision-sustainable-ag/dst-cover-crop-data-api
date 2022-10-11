const {env} = require('./kernel');

module.exports =  {
    name: env.APP_NAME,
    port: env.APP_PORT,
    env: env.APP_ENV ?? 'local',
}