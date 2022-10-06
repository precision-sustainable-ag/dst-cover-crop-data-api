const { DataTypes } = require('sequelize');
const { Model } = require('./Model');
const { Post } = require('./Post');

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class Comment extends Model {

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
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Post,
                    key: 'id',
                }
            },
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
    Comment,
};


