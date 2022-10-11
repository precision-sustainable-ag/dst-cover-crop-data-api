const { Sequelize } = require('sequelize');
const { Log } = require('./LoggingProvider');
const {Provider} = require('./Provider');
const db_conf = require('../../config/database');

class DatabaseProvider extends Provider {

    static database;
    static config;

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
                    error, config
            }});
            return false;
        }

    }

    static async registerInMemory(){
        this.database = new Sequelize('sqlite::memory:',{logging:false});
        this.config = {
            connection: 'sqlite',
            host:'memory',
        }
    }


    static factory(){
        if(this.database){ return this.database; }
        return this.database = new Sequelize(db_conf.database, db_conf.username, db_conf.password, {
            host: db_conf.host,
            /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            dialect: db_conf.connection,
            logging: db_conf.logging ?? false
        });
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
