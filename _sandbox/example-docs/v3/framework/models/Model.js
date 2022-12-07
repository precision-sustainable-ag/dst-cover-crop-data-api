const { CLS:StaticDocument } = require('../documents/StaticDocument');
const { Model:SequelizeModel } = require("sequelize");
const { DataTypes } = require('sequelize');


class Model extends StaticDocument(SequelizeModel) {

   
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
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    }

    /**
     * OpenAPI Request Body Schema / AJV formatted.
     * visit for more info on schemas https://swagger.io/specification/
     * 
     * @param {exclude:array}
     * ["attribute-name", {prop:"prop-name", value:"value-of-prop"}]
     *  
     * @returns Object
     * {
     *      "type":"object",
     *      "properties":{
     *          "attribute":{ "type": "open-api-value-type", "format":"optional-ajv-format" }
     *      }
     *      "required": ["attribute"],
     *      "additionalProperties": false
     * }
     * 
     */
    static schema({exclude=[]}){
        const attributes = this.attributes();

        const schema = {
            type: "object",
            properties: {},
            required: [],
            additionalProperties: false
        }

        for(let [attribute,props] of Object.entries(attributes)){
            if(this.excludeAttribute(exclude, attribute, props)) continue;

            schema.properties[attribute] = {
                type: props?.type?.key.toLowerCase(),
            }

            if(props.format) schema.properties[attribute].format = props.format;

            if(props.allowNull === false) schema.required.push(attribute);
        }

        return schema;
    }

    static excludeAttribute(exclude, attribute, props){
        for(let exclusion of exclude){
            console.log('has prop?', (exclusion?.prop && typeof props[exclusion.prop] != 'undefined'), 'exclude?',(props[exclusion.prop] == exclusion.value))
            if(exclusion?.prop && props[exclusion.prop]){
                if(props[exclusion.prop] == exclusion.value) {console.log('skipping',attribute); return true;}
            }
            if(attribute == exclusion) return true;
        }
        return false;
    }

    /**
     * to learn more about available relations please reference sequelize docs
     * https://sequelize.org/docs/v6/core-concepts/assocs/
     */
    static relations(){
        return {
            
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
    
    static getTable(){
        let table = this.table() ?? this.name;
        table = table.split(/(?=[A-Z])/).join('_').toLowerCase();
        return table.toLowerCase();
    }
    
    static getOptions(dbProvider){
        const _options = Model.options(dbProvider);
        const options = this.options();
        _options.modelName = this.getTable();
        return {
            ..._options,
            ...options,
            hooks: this.hooks()
        }
    }

    static factory(){
        return new this();
    }

    static register(dbProvider){
        // Log.Debug({heading:`Registering Model ${this.name}`})
        console.log(dbProvider)
        const attributes = this.attributes();
        const options = this.getOptions(dbProvider);
        this.init(attributes, options);
    } 

}


module.exports = {
    Model
}

