const { GroupsController } = require("../app/http/controllers/GroupsController");
const { CreateGroupRequest } = require("../app/http/requests/groups/CreateGroupRequest");
const { ListGroupsRequest } = require("../app/http/requests/groups/ListGroupsRequest");
const { RetrieveGroupRequest } = require("../app/http/requests/groups/RetrieveGroupRequest");
const { UpdateGroupRequest } = require("../app/http/requests/groups/UpdateGroupRequest");
const { CreateGroupResource } = require("../app/http/resources/groups/CreateGroupResource");
const { ListGroupsResource } = require("../app/http/resources/groups/ListGroupsResource");
const { RetrieveGroupResource } = require("../app/http/resources/groups/RetrieveGroupResource");
const { UpdateGroupResource } = require("../app/http/resources/groups/UpdateGroupResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');
const { DeleteGroupRequest } = require("../app/http/requests/groups/DeleteGroupRequest");
const { DeleteGroupResource } = require("../app/http/resources/groups/DeleteGroupResource");

module.exports = Router.expose({path:'/groups', routes: [

    Route.post({path:'/', summary:"Create a Group Object",
        request: CreateGroupRequest,
        handler:GroupsController.factory().create,
        response: CreateGroupResource
    }).middleware([Public]),

    Route.get({path:'/', summary:"Get List of Group Objects",
        request: ListGroupsRequest,
        handler:GroupsController.factory().list,
        response: ListGroupsResource
    }).middleware([Public]),

    Route.get({path:'/{id}', summary:"Retrieve a Group Object",
        request: RetrieveGroupRequest,
        handler: GroupsController.factory().retrieve,
        response: RetrieveGroupResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Group Object",
        request: UpdateGroupRequest,
        handler:GroupsController.factory().update,
        response: UpdateGroupResource
    }).middleware([Public]),

    Route.delete({path:'/{id}', summary:"Delete a Group Object",
        request: DeleteGroupRequest,
        handler:GroupsController.factory().delete,
        response: DeleteGroupResource
    }).middleware([Public]),

]});
