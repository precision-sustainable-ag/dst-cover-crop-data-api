import { Sequelize } from 'sequelize';
import db_conf from '../../config/database.js'
import { Log } from './LoggingProvider.js'

export default class DatabaseProvider {

    static async register(){

        Log.Info({message:db_conf, heading:'Testing Database Connection Credentials'})
        try {
            await Database.authenticate();
            Log.Info({message:'Connection has been established successfully.', heading: 'Completed Testing Database Connection Credentials'});
            return true;
        } catch (error) {
            Log.Critical({
                heading:'Database Connection Failed.', 
                message: {
                    error, db_conf
            }});
            return false;
        }

    }

    static factory(){
        return Database;
    }

}

export const Database = new Sequelize(db_conf.database, db_conf.username, db_conf.password, {
    host: db_conf.host,
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    dialect: db_conf.connection
});
