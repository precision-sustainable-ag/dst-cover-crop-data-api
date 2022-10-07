const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { GroupsController } = require('../app/http/controllers/GroupsController');
const { CreateGroupRequest: CreateRequest } = require('../app/http/requests/groups/CreateGroupRequest');
const { ListGroupsRequest: ListRequest } = require('../app/http/requests/groups/ListGroupsRequest');
const { RetrieveGroupRequest: GetRequest } = require('../app/http/requests/groups/RetrieveGroupRequest');
const { UpdateGroupRequest: UpdateRequest } = require('../app/http/requests/groups/UpdateGroupRequest');
const { DeleteGroupRequest: DeleteRequest } = require('../app/http/requests/groups/DeleteGroupRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = GroupsController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



