
const log_conf = require('../config/logging');
const app_conf = require('../config/app');

console.log(app_conf.env, log_conf.exclude.env)
if(log_conf.exclude.env.includes(app_conf.env)){ 
    return console.log('exclude')
}
console.log('include')