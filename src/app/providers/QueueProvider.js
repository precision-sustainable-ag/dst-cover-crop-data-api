const Queue = require("bull");
const redis_conf = require('../../config/redis');
const { Provider } = require("./Provider");
const { Log } = require("./LoggingProvider");

// const QUEUES = {}

class QueueProvider extends Provider {

    static queues = {};

    static async register(queues){

        for(let [channel, definition] of Object.entries(queues)){
            definition.queue = this.buildQueue(channel);
            this.queues[channel] = definition;
            const handler = this.queues[channel].handler;
            this.queues[channel].queue.process((payload,done) => {
                const job = new handler(payload.data,payload);
                job.handle().then(()=>done());
            });
        }

        return true;

    }


    static buildQueue(channel){
        Log.Debug({heading:'Redis Configuration',message:redis_conf});
        return new Queue(channel, { 
            redis: { 
                port: redis_conf.port, 
                host: redis_conf.host, 
                password: redis_conf.password 
            } 
        });
    }

    static Queue({channel, payload}){

        if(!(channel in this.queues)){
            Log.Critical({heading:'Invalid Channel Requests',message: {channel,payload}})
            return false;
        }

        const queue = this.queues[channel].queue;
        
        queue.add(payload);

        return true;
    }

    static factory() {

        return Job;

    }

}

module.exports = {
    QueueProvider
}