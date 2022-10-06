
const { Log } = require('./LoggingProvider');
const {Provider} = require('./Provider');
const express = require('express')
const { bootstrap } = require('../../bootstrap')

class AppProvider extends Provider {

    static async register(){
        const config = this.getConfig();
        Log.Info({message:config, heading:'Testing Database Connection Credentials'})
        try {
            const db = this.factory();
            await db.authenticate();
            Log.Info({message:'Connection has been established successfully.', heading: 'Completed Testing Database Connection Credentials'});
            return true;
        } catch (error) {
            Log.Critical({
                heading:'Database Connection Failed.', 
                message: {
                    error, config
            }});
            return false;
        }

    }



    static async factory(){

        
        const app = express()

        const bootstrapped = await bootstrap(app);
        
        
        if(!bootstrapped){
            Log.Critical({message:`Failed to instantiate ${app_conf.name}.`, heading:'Bootstrapping Failed.'})
            return null;
        } 

        return app;

    }

}


module.exports = {
    AppProvider
}
