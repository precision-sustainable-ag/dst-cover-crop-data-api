const { Log } = require("../../app/providers/LoggingProvider");


class Job {

    channel(){
        return null;
    }

    constructor(payload){
        this.payload = payload;
    }


    async queue(){
        const channel = this.channel();
        const name = this.name;
        Log.Debug({heading:`Queued ${name} on ${channel}`})
        if(channel){
            this.handle();
        }
    }

}

module.exports = {
    Job
}