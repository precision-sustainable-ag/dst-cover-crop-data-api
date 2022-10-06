const CatchAll = require('../http/middleware/CatchAll');
const ErrorRenderer = require('../http/middleware/ErrorRenderer');
const OpenToken = require('../http/middleware/OpenToken');


class MiddlewareProvider {

    static RegisterGlobalMiddleware(app){
        // registeration order matters...
        app.use(OpenToken);
   
    }
    
    static RegisterEndOfLifecycleMiddleware(app){
        // this should be second to last
        app.use(CatchAll);
        // this should always be last.
        app.use(ErrorRenderer);
    }

}

module.exports = {
    MiddlewareProvider
}
