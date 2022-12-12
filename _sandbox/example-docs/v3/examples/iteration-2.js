const {Router} = require('../framework/routing/Router');
const {Route} = require('../framework/routing/Route');
const {RetrieveRequest} = require('../framework/requests/RetrieveRequest');
const {CreateRequest} = require('../framework/requests/CreateRequest');

const RetrieveDoc = require('../docs/examples/retrieve');
const { RetrieveResponse } = require('../framework/responses/RetrieveResponse');
const { Resource } = require('../framework/resources/Resource');


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
            request: RetrieveRequest,
            handler: (req,res,next) => { console.log('handled'); next(); },
            response: {render: () => (req,res,next) => { console.log('responding'); res.send({test:"hello-world"}); }, document: () => {} },
        }),

        Route.post({ path: "/{token}", // follow the OpenAPI standard for path param declaration.
            request: CreateRequest,
            handler: (req,res,next) => { console.log('handled'); next(); },
            response: Resource,
        }),

    ]});

    console.log('DOC',router.document())

    router.register(app);

    app.openapi.paths = {
        ...app.openapi.paths,
        ...router.document(),
    }
} 