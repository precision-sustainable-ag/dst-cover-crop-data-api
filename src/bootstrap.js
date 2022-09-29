import Middleware from './app/http/middleware/kernel.js'
import ModelsProvider from './app/providers/ModelsProvider.js';
import DatabaseProvider from './app/providers/DatabaseProvider.js';
import LoggingProvider from './app/providers/LoggingProvider.js';
import Routes from './routes/kernel.js';


export const Providers = [
    LoggingProvider, //logging provider should be first so any other provider failures can be logged.
    DatabaseProvider,
    ModelsProvider,
];

export async function RegisterProviders(){
    for(let provider of Providers){
        if(await provider.register() == false) return false;
    }
}

export async function bootstrap(app){
    if(await RegisterProviders() == false) return false;
    // first bootstrap global middleware
    Middleware.bootstrap.global(app);
    // third bootstrap routes
    Routes.bootstrap(app);
    // lastly bootstrap end of life cycle middleware
    Middleware.bootstrap.eol(app);

    return true;
}

export default bootstrap