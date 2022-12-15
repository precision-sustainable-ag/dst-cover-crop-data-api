const { FamiliesController } = require("../app/http/controllers/FamiliesController");
const { CreateFamilyRequest } = require("../app/http/requests/families/CreateFamilyRequest");
const { ListFamiliesRequest } = require("../app/http/requests/families/ListFamiliesRequest");
const { RetrieveFamilyRequest } = require("../app/http/requests/families/RetrieveFamilyRequest");
const { UpdateFamilyRequest } = require("../app/http/requests/families/UpdateFamilyRequest");
const { DeleteFamilyRequest } = require("../app/http/requests/families/DeleteFamilyRequest");
const { CreateFamilyResource } = require("../app/http/resources/families/CreateFamilyResource");
const { ListFamiliesResource } = require("../app/http/resources/families/ListFamiliesResource");
const { RetrieveFamilyResource } = require("../app/http/resources/families/RetrieveFamilyResource");
const { UpdateFamilyResource } = require("../app/http/resources/families/UpdateFamilyResource");
const { DeleteFamilyResource } = require("../app/http/resources/families/DeleteFamilyResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/families', routes: [

    Route.post({path:'/', summary:"Create a Family Object",
        request: CreateFamilyRequest,
        handler:FamiliesController.factory().create,
        response: CreateFamilyResource
    }).middleware([]),

    Route.get({path:'/', summary:"Get List of Families Objects",
        request: ListFamiliesRequest,
        handler:FamiliesController.factory().list,
        response: ListFamiliesResource
    }).middleware([Public]),

    Route.get({path:'/{id}', summary:"Retrieve a Family Object",
        request: RetrieveFamilyRequest,
        handler: FamiliesController.factory().retrieve,
        response: RetrieveFamilyResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Family Object",
        request: UpdateFamilyRequest,
        handler:FamiliesController.factory().update,
        response: UpdateFamilyResource
    }).middleware([]),

    Route.delete({path:'/{id}', summary:"Delete a Family Object",
        request: DeleteFamilyRequest,
        handler:FamiliesController.factory().delete,
        response: DeleteFamilyResource
    }).middleware([]),

]});
