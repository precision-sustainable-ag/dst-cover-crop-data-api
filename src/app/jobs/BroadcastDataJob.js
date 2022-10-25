

const { Job } = require("../../framework/jobs/Job");
const { HttpClient } = require("../services/http/HttpClient");
const { Observer } = require('../models/Observer');
const { Family } = require("../models/Family");
const { Group } = require("../models/Group");
const { Crop } = require("../models/Crop");
const { Region } = require("../models/Region");
const { Zone } = require("../models/Zone");


class BroadcastDataJob extends Job {
    
    
    static channel() {
        return 'broadcast';
    }

    transformOperation(data){

        // because we use soft deletes / deletes are performed as update operations.
        if(data?.new?.deleted_at && !data?.old?.deleted_at){
            data.operation = 'DELETE'
        }

        return data;
    }

    includes(){
        return {
            crop: [Family, Group],
            zone: [Region],
            image: [Crop],
            cropsZone: [Zone, Crop],
            synonym: [Crop],
        }
    }

    async transform(data){

        data = this.transformOperation(data);

        const includes = this.includes();
        
        if(!(data.model in includes)) return data;

        const models = includes[data.model];
        
        for(let model of models){
            const fkName = `${model.name}_id`;
            if(data?.new && data.new[fkName]) data.new[model.name] = await model.findOne({where:{id:data.new[fkName]}, paranoid:false});
            if(data?.old && data.old[fkName]) data.old[model.name] = await model.findOne({where:{id:data.old[fkName]}, paranoid:false});
        }

        return data;
    }

    async data() {
        const msg = this.payload;
        const payload = JSON.parse(msg.payload);

        const data = {
            model: payload.model,
            operation: payload.operation,
            old: JSON.parse(payload.old),
            new: JSON.parse(payload.new),
        }

        return this.transform(data);
    }

    async handle() {
        const data = await this.data();
        const observers = await Observer.findAll();
        const failed = [];

        for(let observer of observers){

            try {
                const response = await HttpClient.post(observer.webhook,data);
                if(response.status >= 400) throw new Error(`${observer.domain} failed with status ${response.status}`);
            }
            catch(error){
                failed.push([observer,error]);
            }

        }

        // TODO: notify each observer of failed message.
        for(let [observer,error] of failed) {
            data.error = {heading:error.message, stack:error.stack};
            observer.notify(data);
        }

        return true;
    }


}

module.exports = {
    BroadcastDataJob
}