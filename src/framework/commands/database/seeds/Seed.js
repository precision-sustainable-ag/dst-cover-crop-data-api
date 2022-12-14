const { DatabaseProvider } = require('../../../../app/providers/DatabaseProvider');
const { Log } = require('../../../../app/providers/LoggingProvider');

module.exports = class Seed {

    static MODEL = null;

    static model(){
        if(this.MODEL) return this.MODEL;
        return null;
    }
    
    static async data(){

        return [
            {}
        ];

    }

    static async plant(){
        
        const model = this.model();
        const data = await this.data();
        if (!model) return;
        model.register(DatabaseProvider);
        for(let row of data){
            await model.create(row);
        }
        return data;

    }

}