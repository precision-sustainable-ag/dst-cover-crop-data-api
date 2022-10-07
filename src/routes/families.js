const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { FamiliesController } = require('../app/http/controllers/FamiliesController');
const { CreateFamilyRequest: CreateRequest } = require('../app/http/requests/families/CreateFamilyRequest');
const { ListFamiliesRequest: ListRequest } = require('../app/http/requests/families/ListFamiliesRequest');
const { RetrieveFamilyRequest: GetRequest } = require('../app/http/requests/families/RetrieveFamilyRequest');
const { UpdateFamilyRequest: UpdateRequest } = require('../app/http/requests/families/UpdateFamilyRequest');
const { DeleteFamilyRequest: DeleteRequest } = require('../app/http/requests/families/DeleteFamilyRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = FamiliesController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



