const {ModelsProvider} = require('./app/providers/ModelsProvider');
const {DatabaseProvider} = require('./app/providers/DatabaseProvider');
const {LoggingProvider} = require('./app/providers/LoggingProvider');
const {ValidatorProvider} = require('./app/providers/ValidatorProvider');
const {MiddlewareProvider} = require('./app/providers/MiddlewareProvider');
const {RoutesProvider} = require('./app/providers/RoutesProvider');

// these providers registration function will be given 
// an instance of the application when called.
const Providers = [
    LoggingProvider, //logging provider should be first so any other provider failures can be logged.
    DatabaseProvider,
    ModelsProvider,
    ValidatorProvider
];

async function RegisterProviders(app){
    for(let provider of Providers){
        if(await provider.register(app) == false) return false;
    }
}


async function bootstrap(app){
    if(await RegisterProviders(app) == false) return false;
    // first bootstrap global middleware
    await MiddlewareProvider.RegisterGlobalMiddleware(app);
    // third bootstrap routes
    await RoutesProvider.register(app);
    // lastly bootstrap end of life cycle middleware
    await MiddlewareProvider.RegisterEndOfLifecycleMiddleware(app)

    return true;
}

module.exports = {
    bootstrap, RegisterProviders, Providers
}