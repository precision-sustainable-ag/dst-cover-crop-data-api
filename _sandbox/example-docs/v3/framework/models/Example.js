const { DataTypes } = require('sequelize');
const { Model } = require('./Model');


class Example extends Model {

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
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                format: 'email'
            },

        }
    }
    
    /**
     * to learn more about available options please reference sequelize docs
     * https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static options(dbProvider){
        return {
            // Other model options go here
            sequelize: dbProvider.factory(), // We need to pass the connection instance
            modelName: this.getTable(), // We need to choose the model name,
            underscored: true, // tells sequelize to convert table names and column names into snake case
            paranoid: true, // soft deletes ( deleted_at column )
        }
    }

    /**
     * Visit sequlize docs for list of available hooks and their firing order.
     * https://sequelize.org/docs/v6/other-topics/hooks/#available-hooks
     */
    static hooks(){
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
}


module.exports = {
    Example
}

