const { Sequelize } = require('sequelize');
const { Log } = require('./LoggingProvider');
const {Provider} = require('./Provider');
const db_conf = require('../../config/database');
const { PostgresService } = require('../services/database/PostgresService');
const Pluralize = require('pluralize');
const { BroadcastDataJob } = require('../jobs/BroadcastDataJob');

class DatabaseProvider extends Provider {

    static database;
    static config;
    static service;

    static getConfig(){
        if(this.config) return this.config;
        return this.config = db_conf;
    }

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
                    error: error.stack, config
                }});
            return false;
        }

    }

    static async registerListeners(models){

        if(this.config.connection != 'postgres') return false;

        let watch = db_conf.watch;

        if(watch.length == 0) watch = [];

        if(watch.length == 1 && watch[0] == '*') watch = Object.keys(models);
        
        const service = DatabaseProvider.Service();

        for(let channel of watch){
            service.listen({channel, callback:(payload)=> BroadcastDataJob.Queue(payload)})
        }

        Log.Info({heading:'Watching Database Channels:', message:watch});

        return true;
    }

    static async registerInMemory(){
        this.database = new Sequelize('sqlite::memory:',{logging:false});
        this.config = {
            connection: 'sqlite',
            host:'memory',
        }
    }

    static ssl(){
        if(db_conf.ssl === 'true'){
            return {
                dialectOptions: {
                    ssl: {
                      require: db_conf.ssl, // This will help you. But you will see nwe error
                      rejectUnauthorized: false // This line will fix new error
                    }
                }
            }
        }
        return {};
    }

    static settings(){
        const ssl = this.ssl();
        return {
            database: db_conf.database,
            username: db_conf.username,
            password: db_conf.password,
            host: db_conf.host,
            port: db_conf.port,
            dialect: db_conf.connection,
            logging: db_conf.logging,
            ...ssl
        }
    }

    static factory(){
        if(this.database){ return this.database; }

        const settings = this.settings();

        return this.database = new Sequelize(settings);
    }

    static Service(){
        if(this.service) return this.service;

        return this.service = new PostgresService(this.settings());
    }

    static async sync(modelsProvider, options={}){
        const MIGRATIONS = await modelsProvider.factory();

        for (let migration of Object.values(MIGRATIONS)) {
        
            await migration.sync(options);
        }
    }

}


module.exports = {
    DatabaseProvider
}
