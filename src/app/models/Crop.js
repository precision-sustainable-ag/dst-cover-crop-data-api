const { DataTypes } = require('sequelize');
const { Family } = require('./Family');
const { Group } = require('./Group');
const { Model } = require('../../framework/models/Model');

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class Crop extends Model {

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
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            scientificName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            usdaSymbol: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: Group,
                    key: 'id',
                },
                validate:{
                    minimum: 1,
                }
            },
            familyId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: Family,
                    key: 'id',
                },
                validate:{
                    minimum: 1,
                }
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


}

module.exports =  {
    Crop
};


