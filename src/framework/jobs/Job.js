const { Log } = require("../../app/providers/LoggingProvider");
const { QueueProvider } = require("../../app/providers/QueueProvider");


class Job {

    static channel(){
        return 'default';
    }

    constructor(data={}, config={}){
        this.payload = data;
        this.config = config;
    }

    async handle(){
        return true;
    }


    static Queue(payload){
        const channel = this.channel();
        QueueProvider.Queue({channel, payload});
    }

}

module.exports = {
    Job
}