import { Model as SequelizeModel } from 'sequelize';
import DatabaseProvider from '../providers/DatabaseProvider.js';

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
export default class Model extends SequelizeModel {

    // Overridable functions
    static table(){
        return null
    }

    static attributes(){
        return {
            // Model attributes are defined here
        }
    }

    static options(){
        return {
            // Other model options go here
            sequelize: DatabaseProvider.factory(), // We need to pass the connection instance
            modelName: this.getTable(), // We need to choose the model name,
            underscored: true, // tells sequelize to convert table names and column names into snake case
        }
    }

    
    // Parent Functions
    static getTable(){
        const table = this.table() ?? this.name;
        return table.toLowerCase();
    }
    
    static getOptions(){
        const options = this.options();
        const _options = Model.options();
        _options.modelName = this.getTable();
        return {
            ..._options,
            ...options,
        }
    }

    static factory(){
        return new this();
    }

    static register(){
        this.init(this.attributes(), this.getOptions());
    }

}