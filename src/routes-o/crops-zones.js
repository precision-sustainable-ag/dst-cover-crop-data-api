const {Router} = require('express');
const { CropsZonesController } = require('../app/http/controllers/CropsZonesController');
const Public = require('../app/http/middleware/Public');
const { PaginatedRequest } = require('../app/http/requests/PaginatedRequest');

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

router.get('/', Public, PaginatedRequest.handle(), Controller.listRecords)

module.exports =  router



