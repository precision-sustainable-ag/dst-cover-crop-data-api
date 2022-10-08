const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { RegionsController } = require('../app/http/controllers/RegionsController');
const { CreateRegionRequest: CreateRequest } = require('../app/http/requests/regions/CreateRegionRequest');
const { ListRegionsRequest: ListRequest } = require('../app/http/requests/regions/ListRegionsRequest');
const { RetrieveRegionRequest: GetRequest } = require('../app/http/requests/regions/RetrieveRegionRequest');
const { UpdateRegionRequest: UpdateRequest } = require('../app/http/requests/regions/UpdateRegionRequest');
const { DeleteRegionRequest: DeleteRequest } = require('../app/http/requests/regions/DeleteRegionRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = RegionsController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



