const CatchAll = require('../http/middleware/CatchAll');
const ErrorRenderer = require('../http/middleware/ErrorRenderer');
const Cors = require('../http/middleware/Cors');
const Auth = require('../http/middleware/Auth');
const { trackRequestStats } = require('../http/middleware/Stats');

class MiddlewareProvider {

    static RegisterGlobalMiddleware(app){
        /**
         * please visit documentation for more information on cors package
         * https://www.npmjs.com/package/cors
         */
        app.use(Cors);
        // registeration order matters...
        app.use(Auth());
        // middleware to track each request, hence placed inside global
        app.use(trackRequestStats);
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
