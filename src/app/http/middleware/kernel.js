
import CatchAll from "./CatchAll.js";
import ErrorRenderer from "./ErrorRenderer.js";

export function RegisterGlobalMiddleware(app){

    // registeration order matters...

}

export function RegisterEndOfLifecycleMiddleware(app){
    // this should be second to last
    app.use(CatchAll);
    // this should always be last.
    app.use(ErrorRenderer);
}

/**
 * 
 * Register all global middleware here
 * keep in mind the order of registration is important.
 * middleware will always be executed in order of registration
 */
export const bootstrap = {
    global: (app) => RegisterGlobalMiddleware(app),
    eol: (app) => RegisterEndOfLifecycleMiddleware(app),
}

export default {
    bootstrap
}