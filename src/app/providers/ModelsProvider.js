import { getFilesFrom, app_path } from '../support/helpers/path.js'
import { Log } from './LoggingProvider.js';


const MODELS = {};

export default class ModelsProvider {
    
    static async register(){

        const modelsDir = 'app/models';
        const modelFiles = await getFilesFrom(modelsDir);

        for(let file of modelFiles){

            if(file == 'Model.js') continue;

            const module = await import(app_path(`app/models/${file}`))
            const model = module.default;
            model.register();
            MODELS[model.name] = model;

        }

        Log.Info({message:Object.keys(MODELS),heading:'Registered Models'});

        return true;
    }

    static factory(){
        return MODELS;
    }

}
