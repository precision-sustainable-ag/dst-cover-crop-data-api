const { BroadcastDataJob } = require('../app/jobs/BroadcastDataJob');
const {env} = require('./kernel');

module.exports =  {
    broadcast: {
        handler: BroadcastDataJob
    }
}