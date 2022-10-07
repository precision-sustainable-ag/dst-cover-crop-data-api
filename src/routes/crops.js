const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { CropsController } = require('../app/http/controllers/CropsController');
const { CreateCropRequest: CreateRequest } = require('../app/http/requests/crops/CreateCropRequest');
const { ListCropsRequest: ListRequest } = require('../app/http/requests/crops/ListCropsRequest');
const { RetrieveCropRequest: GetRequest } = require('../app/http/requests/crops/RetrieveCropRequest');
const { UpdateCropRequest: UpdateRequest } = require('../app/http/requests/crops/UpdateCropRequest');
const { DeleteCropRequest: DeleteRequest } = require('../app/http/requests/crops/DeleteCropRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = CropsController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



