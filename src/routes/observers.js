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
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/observers', routes: [

    Route.post({path:'/', summary:"Create a Observer Object",
        request: CreateObserverRequest,
        handler:ObserversController.factory().create,
        response: CreateObserverResource
    }).middleware([]),

    Route.get({path:'/', summary:"Get List of Observers Objects",
        request: ListObserversRequest,
        handler:ObserversController.factory().list,
        response: ListObserversResource
    }).middleware([]),

    Route.get({path:'/{id}', summary:"Retrieve a Observer Object",
        request: RetrieveObserverRequest,
        handler: ObserversController.factory().retrieve,
        response: RetrieveObserverResource
    }).middleware([]),

    Route.put({path:'/{id}', summary:"Update a Observer Object",
        request: UpdateObserverRequest,
        handler:ObserversController.factory().update,
        response: UpdateObserverResource
    }).middleware([]),

    Route.delete({path:'/{id}', summary:"Delete a Observer Object",
        request: DeleteObserverRequest,
        handler:ObserversController.factory().delete,
        response: DeleteObserverResource
    }).middleware([]),

]});
