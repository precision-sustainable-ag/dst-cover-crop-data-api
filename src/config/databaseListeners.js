const { BroadcastDataJob } = require('../app/jobs/BroadcastDataJob');
const {env} = require('./kernel');

module.exports =  [
    {
        channel: 'data_edit',
        handler: (payload) => BroadcastDataJob.Queue(payload)
    },
]