
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');
const { ZonesController } = require("../app/http/controllers/ZonesController");
const { RetrieveZoneRequest } = require("../app/http/requests/zones/RetrieveZoneRequest");
const { RetrieveZoneResource } = require("../app/http/resources/zones/RetrieveZoneResource");
const { UpdateZoneRequest } = require("../app/http/requests/zones/UpdateZoneRequest");
const { UpdateZoneResource } = require("../app/http/resources/zones/UpdateZoneResource");
const { DeleteZoneRequest } = require("../app/http/requests/zones/DeleteZoneRequest");
const { DeleteZoneResource } = require("../app/http/resources/zones/DeleteZoneResource");
const { ListCropsZonesRequest } = require("../app/http/requests/cropsZones/ListCropsZonesRequest");
const { ListCropsZonesResource } = require("../app/http/resources/cropsZones/ListCropsZonesResource");
const { CropsZonesController } = require("../app/http/controllers/CropsZonesController");
const { CreateCropsZoneRequest } = require("../app/http/requests/cropsZones/CreateCropsZoneRequest");
const { CreateCropsZoneResource } = require("../app/http/resources/cropsZones/CreateCropsZoneResource");
const { RetrieveCropsZoneRequest } = require("../app/http/requests/cropsZones/RetrieveCropsZoneRequest");
const { RetrieveCropsZoneResource } = require("../app/http/resources/cropsZones/RetrieveCropsZoneResource");
const { DeleteCropsZoneRequest } = require("../app/http/requests/cropsZones/DeleteCropsZoneRequest");
const { DeleteCropsZoneResource } = require("../app/http/resources/cropsZones/DeleteCropsZoneResource");


/**
 * creating and getting list of zones is in regions router
 * because you can only get zones by regions
 * and a zone requires a region to be created.
 */
module.exports = Router.expose({path:'/zones', routes: [

    Route.get({path:'/{id}', summary:"Retrieve a Zone Object for a given Region",
        request: RetrieveZoneRequest,
        handler: ZonesController.factory().retrieve,
        response: RetrieveZoneResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Zone Object for a given Region",
        request: UpdateZoneRequest,
        handler: ZonesController.factory().update,
        response: UpdateZoneResource
    }).middleware([]),

    Route.delete({path:'/{id}', summary:"Delete a Zone Object for a given Region",
        request: DeleteZoneRequest,
        handler: ZonesController.factory().update,
        response: DeleteZoneResource
    }).middleware([]),

    Router.expose({path:'/{zoneId}/crops', tags:['crops','zones','Crops by Zone'],routes:[

        Route.get({path:'/', summary:"Get list of Crop Objects for a given Zone",
            request: ListCropsZonesRequest,
            handler: CropsZonesController.factory().list,
            response: ListCropsZonesResource
        }).middleware([Public]),

        Route.post({path:'/{cropId}', summary:"Add a Crop to a given Zone",
            request: CreateCropsZoneRequest,
            handler: CropsZonesController.factory().create,
            response: CreateCropsZoneResource
        }).middleware([]),


        Route.get({path:'/{cropId}', summary:"Get a Crop Objects for a given Zone",
            request: RetrieveCropsZoneRequest,
            handler: CropsZonesController.factory().retrieve,
            response: RetrieveCropsZoneResource
        }).middleware([Public]),

        Route.delete({path:'/{cropId}', summary:"Delete a Crop Objects for a given Zone",
            request: DeleteCropsZoneRequest,
            handler: CropsZonesController.factory().retrieve,
            response: DeleteCropsZoneResource
        }).middleware([]),

    ]}),


]});
