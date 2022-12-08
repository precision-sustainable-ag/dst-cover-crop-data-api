
const { getFilesFrom, app_path } = require('../support/helpers/path')
const { Log } = require('./LoggingProvider');

const ROUTES = {};

class RoutesProvider {
    
    /**
     * use this if registration order matters for your models.
     * overrides auto-resolver. if you use this function, you must list all models here.                                                                                                                                                                                                             `
     * @returns returns ordered list of models.
     */ 
     static exclude(){
        return [
            /**
             * we are excluding these routers becuase 
             * the are subroutes in another router.
             */
            'cropsZones.js', 
            'synonyms.js', 
            'images.js', 
        ];
    }

    static async getRouters(){

            const dir = 'routes';
            const files = await getFilesFrom(dir);
            const routers = {};
            const exclude = this.exclude();

            for(let file of files){
                if(exclude.includes(file)) continue;
                
                // const prefix = `/${file.replace('.js','')}`;
                const module = await import(app_path(`${dir}/${file}`))
                const router = module.default;
                routers[file] = router;

            }

            return routers;
    }

    static async register(app){

        const routers = await this.getRouters();

        for(let [file, router] of Object.entries(routers)) {
            // app.use(prefix,router);
            router.register(app)
            ROUTES[file] = router;
        }

        Log.Info({message:Object.keys(ROUTES),heading:'Registered Routes'});

        return true;
    }

    static factory(){
        return ROUTES;
    }

}


module.exports = {
    RoutesProvider, default:RoutesProvider
}
