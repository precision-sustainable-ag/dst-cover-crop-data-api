const { ObserversController } = require("../app/http/controllers/ObserversController");
const { CreateObserverRequest } = require("../app/http/requests/observers/CreateObserverRequest");
const { ListObserversRequest } = require("../app/http/requests/observers/ListObserversRequest");
const { RetrieveObserverRequest } = require("../app/http/requests/observers/RetrieveObserverRequest");
const { UpdateObserverRequest } = require("../app/http/requests/observers/UpdateObserverRequest");
const { DeleteObserverRequest } = require("../app/http/requests/observers/DeleteObserverRequest");
const { CreateObserverResource } = require("../app/http/resources/observers/CreateObserverResource");
const { ListObserversResource } = require("../app/http/resources/observers/ListObserversResource");
const { RetrieveObserverResource } = require("../app/http/resources/observers/RetrieveObserverResource");
const { UpdateObserverResource } = require("../app/http/resources/observers/UpdateObserverResource");
const { DeleteObserverResource } = require("../app/http/resources/observers/DeleteObserverResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Auth = require('../app/http/middleware/Auth');

module.exports = Router.expose({path:'/observers', routes: [

    Route.post({path:'/', summary:"Create a Observer Object", description: 'REQUIRES: crops_admin scope.',
        request: CreateObserverRequest,
        handler:ObserversController.factory().create,
        response: CreateObserverResource
    }).middleware([Auth('crops_admin')]),

    Route.get({path:'/', summary:"Get List of Observers Objects", description: 'REQUIRES: crops_admin scope.',
        request: ListObserversRequest,
        handler:ObserversController.factory().list,
        response: ListObserversResource
    }).middleware([Auth('crops_admin')]),

    Route.get({path:'/{id}', summary:"Retrieve a Observer Object", description: 'REQUIRES: crops_admin scope.',
        request: RetrieveObserverRequest,
        handler: ObserversController.factory().retrieve,
        response: RetrieveObserverResource
    }).middleware([Auth('crops_admin')]),

    Route.put({path:'/{id}', summary:"Update a Observer Object", description: 'REQUIRES: crops_admin scope.',
        request: UpdateObserverRequest,
        handler:ObserversController.factory().update,
        response: UpdateObserverResource
    }).middleware([Auth('crops_admin')]),

    Route.delete({path:'/{id}', summary:"Delete a Observer Object", description: 'REQUIRES: crops_admin scope.',
        request: DeleteObserverRequest,
        handler:ObserversController.factory().delete,
        response: DeleteObserverResource
    }).middleware([Auth('crops_admin')]),

]});
