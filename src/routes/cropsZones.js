const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { CropsZonesController } = require('../app/http/controllers/CropsZonesController');
const { CreateCropsZoneRequest: CreateRequest } = require('../app/http/requests/cropsZones/CreateCropsZoneRequest');
const { ListCropsZonesRequest: ListRequest } = require('../app/http/requests/cropsZones/ListCropsZonesRequest');
const { RetrieveCropsZoneRequest: GetRequest } = require('../app/http/requests/cropsZones/RetrieveCropsZoneRequest');
const { UpdateCropsZoneRequest: UpdateRequest } = require('../app/http/requests/cropsZones/UpdateCropsZoneRequest');
const { DeleteCropsZoneRequest: DeleteRequest } = require('../app/http/requests/cropsZones/DeleteCropsZoneRequest');
const Public = require('../app/http/middleware/Public');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = CropsZonesController.factory();


/**
 * Because we are using this router as a subrouter in zones, we dont want to auto-generate routes for /cropsZones.
 * we accomplish this by adding cropsZones.js to the exlcude array in the app/providers/RouterProvider.js file.
 */
const router = Router();

/**
 * all get requests are 100% open to public
 */
router.get('/:zoneId/crops', Public, ListRequest.handle(),Controller.list);
router.get('/:zoneId/crops/:cropId',Public, GetRequest.handle(),Controller.retrieve);

/**
 * All requests that edit data must have
 * a data-entry authorization token with the required scopes.
 */
router.post('/:zoneId/crops/:cropId', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.delete('/:zoneId/crops/:cropId', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



