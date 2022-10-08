const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { ZonesController } = require('../app/http/controllers/ZonesController');
const { CreateZoneRequest: CreateRequest } = require('../app/http/requests/zones/CreateZoneRequest');
const { ListZonesRequest: ListRequest } = require('../app/http/requests/zones/ListZonesRequest');
const { RetrieveZoneRequest: GetRequest } = require('../app/http/requests/zones/RetrieveZoneRequest');
const { UpdateZoneRequest: UpdateRequest } = require('../app/http/requests/zones/UpdateZoneRequest');
const { DeleteZoneRequest: DeleteRequest } = require('../app/http/requests/zones/DeleteZoneRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = ZonesController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



