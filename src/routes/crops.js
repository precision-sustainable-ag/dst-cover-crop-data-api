const { CropsController } = require("../app/http/controllers/CropsController");
const { CreateCropRequest } = require("../app/http/requests/crops/CreateCropRequest");
const { ListCropsRequest } = require("../app/http/requests/crops/ListCropsRequest");
const { RetrieveCropRequest } = require("../app/http/requests/crops/RetrieveCropRequest");
const { CreateCropResource } = require("../app/http/resources/crops/CreateCropResource");
const { ListCropResource } = require("../app/http/resources/crops/ListCropResource");
const { RetrieveCropResoruce } = require("../app/http/resources/crops/RetrieveCropResoruce");
const { UpdateCropResource } = require("../app/http/resources/crops/UpdateCropResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const { UpdateCropRequest } = require("../app/http/requests/crops/UpdateCropRequest");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/crops', routes: [

    Route.post({path:'/', summary:"Create a Crop Object",
        request: CreateCropRequest,
        handler:CropsController.factory().create,
        response: CreateCropResource
    }).middleware([Public]),

    Route.get({path:'/', summary:"Get List of Crop Objects",
        request: ListCropsRequest,
        handler:CropsController.factory().list,
        response: ListCropResource
    }),

    Route.get({path:'/{id}', summary:"Retrieve a Crop Object",
        request: RetrieveCropRequest,
        handler: CropsController.factory().retrieve,
        response: RetrieveCropResoruce
    }),

    Route.put({path:'/{id}', summary:"Update a Crop Object",
        request: UpdateCropRequest,
        handler:CropsController.factory().update,
        response: UpdateCropResource
    }).middleware([Public]),

]});
