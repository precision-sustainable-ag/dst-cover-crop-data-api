const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { CropsZonesController } = require('../app/http/controllers/CropsZonesController');
const { CreateCropsZoneRequest: CreateRequest } = require('../app/http/requests/cropsZones/CreateCropsZoneRequest');
const { ListCropsZonesRequest: ListRequest } = require('../app/http/requests/cropsZones/ListCropsZonesRequest');
const { RetrieveCropsZoneRequest: GetRequest } = require('../app/http/requests/cropsZones/RetrieveCropsZoneRequest');
const { UpdateCropsZoneRequest: UpdateRequest } = require('../app/http/requests/cropsZones/UpdateCropsZoneRequest');
const { DeleteCropsZoneRequest: DeleteRequest } = require('../app/http/requests/cropsZones/DeleteCropsZoneRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = CropsZonesController.factory();

const router = Router();

router.get('/:zoneId/crops', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:zoneId/crops/:cropId', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.post('/:zoneId/crops/:cropId', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.delete('/:zoneId/crops/:cropId', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



