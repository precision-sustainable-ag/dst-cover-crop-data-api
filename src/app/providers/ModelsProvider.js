
const { Comment } = require('../models/Comment');
const { Post } = require('../models/Post');
const { getFilesFrom, app_path } = require('../support/helpers/path');
const { Log } = require('./LoggingProvider');
const Associations = require('../models/Associations');


const MODELS = {};

class ModelsProvider {
    
    /**
     * overrides auto-resolver. if you use this function, you must list all models here.                                                                                                                                                                                                             `
     * @returns returns ordered list of models.
     */ 
     static models(){
        return [ 
        ];
    }

    static async getModels(){

        const models = this.models();
        if(models.length <= 0) return this.getModelsFromDir();
        return models;
    }

    static async getModelsFromDir(){

        const modelsDir = 'app/models';
        const modelFiles = await getFilesFrom(modelsDir);
        const models = [];

        for(let file of modelFiles){
            const className = file.replace('.js','');
            if(className == 'Model') continue;
            if(className == 'Associations') continue;

            const module = require(app_path(`app/models/${file}`))
            console.log('>>> Module',module)
            const model = module[className] ?? module;
            models.push(model);
        }

        return models;
}

static async register(){

    const models = await this.getModels();

    // first register all models
    for(let model of models){
        // have i already registered this model?
        if(model.getTable() in MODELS) continue;

        /**
         * before we register this model,
         * we need to see if this model depends on another other models
         * via the references foreign key property.
         */
        const attributes = model.attributes();

        for(let [attribute, properties] of Object.entries(attributes) ){
            
            if(properties?.references){
                const parent = properties.references.model;
                if(parent.getTable() in MODELS) continue;
                // some models might reference themselves.
                if(parent.getTable() == model.getTable()) continue;
                await parent.register();
                MODELS[parent.getTable()] = parent;
            }
        }

        await model.register();
        MODELS[model.getTable()] = model;
    }

    for(let association of Associations){
        const parent = association.parent;
        const child = association.child;

        parent.model[parent.relation](child.model,parent.options);
        child.model[child.relation](parent.model,child.options);
    }

    Log.Info({message:Object.keys(MODELS),heading:'Registered Models'});

    return true;
}

    static factory(){
        if(Object.keys(MODELS).length <= 0){
            return new Promise((resolve, reject)=>{
                ModelsProvider.register().then((registered)=>{resolve(MODELS)});
            });
        }
        return MODELS;
    }

}


module.exports = {
    ModelsProvider
}
