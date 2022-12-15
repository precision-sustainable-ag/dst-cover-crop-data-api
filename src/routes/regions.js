const { RegionsController } = require("../app/http/controllers/RegionsController");
const { CreateRegionRequest } = require("../app/http/requests/regions/CreateRegionRequest");
const { ListRegionsRequest } = require("../app/http/requests/regions/ListRegionsRequest");
const { RetrieveRegionRequest } = require("../app/http/requests/regions/RetrieveRegionRequest");
const { CreateRegionResource } = require("../app/http/resources/regions/CreateRegionResource");
const { ListRegionsResource } = require("../app/http/resources/regions/ListRegionsResource");
const { RetrieveRegionResource } = require("../app/http/resources/regions/RetrieveRegionResource");
const { UpdateRegionResource } = require("../app/http/resources/regions/UpdateRegionResource");
const { UpdateRegionRequest } = require("../app/http/requests/regions/UpdateRegionRequest");
const { CreateZoneRequest } = require("../app/http/requests/zones/CreateZoneRequest");
const { CreateZoneResource } = require("../app/http/resources/zones/CreateZoneResource");
const { ZonesController } = require("../app/http/controllers/ZonesController");
const { ListZonesResource } = require("../app/http/resources/zones/ListZonesResource");
const { ListZonesRequest } = require("../app/http/requests/zones/ListZonesRequest");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/regions', routes: [

    Route.post({path:'/', summary:"Create a Region Object",
        request: CreateRegionRequest,
        handler: RegionsController.factory().create,
        response: CreateRegionResource
    }).middleware([]),

    Route.get({path:'/', summary:"Get List of Region Objects",
        request: ListRegionsRequest,
        handler: RegionsController.factory().list,
        response: ListRegionsResource
    }).middleware([Public]),

    Route.get({path:'/{id}', summary:"Retrieve a Region Object",
        request: RetrieveRegionRequest,
        handler: RegionsController.factory().retrieve,
        response: RetrieveRegionResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Region Object",
        request: UpdateRegionRequest,
        handler: RegionsController.factory().update,
        response: UpdateRegionResource
    }).middleware([]),

    /**
     * regions zones
     */
    Router.expose({path:'/{regionId}/zones', tags:['zones','regions'], routes:[

        Route.post({path:'/', summary:"Create a Zone Object for a given Region",
            request: CreateZoneRequest,
            handler: ZonesController.factory().create,
            response: CreateZoneResource
        }).middleware([]),

        Route.get({path:'/', summary:"Get List of Zone Objects for a given Region",
            request: ListZonesRequest,
            handler: ZonesController.factory().list,
            response: ListZonesResource
        }).middleware([Public]),

    ]})

]});
