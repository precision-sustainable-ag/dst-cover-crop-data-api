

const { Job } = require("../../framework/jobs/Job");


class BroadcastData extends Job {
    
    
    channel() {
        return 'broadcast';
    }

    data() {
        const payload = this.payload;
        const data = JSON.parse(this.payload.payload);
        return {
            model:  payload.channel,
            operation: data.operation,
            old: JSON.parse(data.old),
            new: JSON.parse(data.new),
        }
    }

    async handle() {
        const data = this.data();

        console.log('>>> Broadcasting',data);
    }


}

module.exports = {
    BroadcastData
}