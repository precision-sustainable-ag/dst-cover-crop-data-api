

const { Job } = require("../../framework/jobs/Job");


class BroadcastDataJob extends Job {
    
    
    static channel() {
        return 'broadcast';
    }

    data() {
        const msg = this.payload;
        const data = JSON.parse(msg.payload);
        return {
            model:  msg.channel,
            operation: data.operation,
            old: JSON.parse(data.old),
            new: JSON.parse(data.new),
        }
    }

    async handle() {
        const data = this.data();

        console.log('>>> Broadcasting',data);
        return true;
    }


}

module.exports = {
    BroadcastDataJob
}