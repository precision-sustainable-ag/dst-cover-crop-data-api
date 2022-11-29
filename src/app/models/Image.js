const { DataTypes } = require('sequelize');
const { Crop } = require('./Crop');
const { Model } = require('../../framework/models/Model');
const { Region } = require('./Region');

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class Image extends Model {

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
                autoIncrement: true
            },
            growthStage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            yearTaken: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            src: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isThumbnail: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                default: false,
            },
            cropId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references:{
                    model: Crop,
                    key: 'id',
                }
            },
            regionId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references:{
                    model: Region,
                    key: 'id',
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
    Image
};


