const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { ZonesController } = require('../app/http/controllers/ZonesController');
const { CreateZoneRequest: CreateRequest } = require('../app/http/requests/zones/CreateZoneRequest');
const { ListZonesRequest: ListRequest } = require('../app/http/requests/zones/ListZonesRequest');
const { RetrieveZoneRequest: GetRequest } = require('../app/http/requests/zones/RetrieveZoneRequest');
const { UpdateZoneRequest: UpdateRequest } = require('../app/http/requests/zones/UpdateZoneRequest');
const { DeleteZoneRequest: DeleteRequest } = require('../app/http/requests/zones/DeleteZoneRequest');
const CropsZonesRouter = require('./cropsZones.js');
const Public = require('../app/http/middleware/Public');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = ZonesController.factory();

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

/**
 * Registering sub-routers here. 
 * Make sure to exclude these routers from the app/providers/RotuesProvider.js 
 */
router.use(CropsZonesRouter)

module.exports =  router



