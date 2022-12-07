const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { GroupsController } = require('../app/http/controllers/GroupsController');
const { CreateGroupRequest: CreateRequest } = require('../app/http/requests/groups/CreateGroupRequest');
const { ListGroupsRequest: ListRequest } = require('../app/http/requests/groups/ListGroupsRequest');
const { RetrieveGroupRequest: GetRequest } = require('../app/http/requests/groups/RetrieveGroupRequest');
const { UpdateGroupRequest: UpdateRequest } = require('../app/http/requests/groups/UpdateGroupRequest');
const { DeleteGroupRequest: DeleteRequest } = require('../app/http/requests/groups/DeleteGroupRequest');
const Public = require('../app/http/middleware/Public');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = GroupsController.factory();

const router = Router();

/**
 * all get requests are 100% open to public
 */
router.get('/', Public, ListRequest.handle(),Controller.list);
router.get('/:id', Public, GetRequest.handle(),Controller.retrieve);

/**
 * All requests that edit data must have
 * a data-entry authorization token with the required scopes.
 */
router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



