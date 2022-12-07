const {Router} = require('../framework/routing/Router');
const {Route} = require('../framework/routing/Route');


const RetrieveRequestDoc = require('../docs/examples/requests/retrieve-request-variant');
const RetrieveResponseDoc = require('../docs/examples/responses/example-item-response');
const RetrieveDoc = require('../docs/examples/retrieve');

/**
 * 
 * This iteration demonstates that providing a document 
 * in a request / response handler 
 * will override the document found within a staticly declared document.
 *  
 */
module.exports = (app) => {

    const router = Router.expose({ path: "/examples", routes: [

        Route.get({ path: "/{token}", // follow the OpenAPI standard for path param declaration.
            request: {handle: () => (req,res,next) => { console.log('validating'); next(); }, document: () => RetrieveRequestDoc },
            handler: (req,res,next) => { console.log('handled'); next(); },
            response: {render: () => (req,res,next) => { console.log('responding'); res.send({test:"hello-world"}); }, document: () => {} },
        }).document(RetrieveDoc),

    ]});

    router.register(app);

    app.openapi.paths = {
        ...app.openapi.paths,
        ...router.document(),
    }
} 