const Queue = require("bull");
const redis_conf = require('../src/config/redis');



class QueueProvider extends Provider {

    static queues = {};

    async register(){

        return true;

    }

    static buildQueue(channel){
        return new Queue(channel, { 
            redis: { 
                port: redis_conf.port, 
                host: redis_conf.host, 
                password: redis_conf.password 
            } 
        });
    }

    static open(channel){
        if(channel in this.queues) return queues[channel];
        
        const queue = this.buildQueue(channel);

        queues[channel] = queue;

        return queue;
    }

    static queue(channel, job){
        const queue = this.open(channel);

    }

    static factory() {

        return Job;

    }



}

module.exports = {
    QueueProvider
}