const { DataTypes } = require('sequelize');
const { Log } = require('../providers/LoggingProvider');
const { Model } = require('../../framework/models/Model')

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class Observer extends Model {

    /**
     * For more information on sequelize attributes & options
     * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static attributes(){
        return {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate:{
                    minimum: 1,
                }
            },
            domain: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            webhook: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }
    }

    /**
     * For more information on sequelize relations
     * please visit https://sequelize.org/docs/v6/core-concepts/assocs/
     */
    static relations(){
        return {
        }
    }

    /** 
     * leave null for sequelize to infer 
     * the table name as a pluralized snake cased version of the class name:
     * example:
     *  Class Post will look for table posts
     *  Class CommonCategory will look for table common_categories
     */ 
     static table(){
        return null
    }

    /**
     * Generally speaking you will not need to add any aditional options
     * that are not already set in the base model. 
     * The primary reason to add options here is to override base model options
     * or to add additional column indexes.
     * 
     * For more information on sequelize attributes & options
     * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static options(){
        return {}
    }


    // TODO: this needs to actually notify the registered observer, rather than just logging.
    notify(message){
        Log.Critical({heading:`Failed Job for ${this.domain}`,message});
    }


}

module.exports =  {
    Observer
};


