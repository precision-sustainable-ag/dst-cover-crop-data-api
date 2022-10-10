const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { CropsController } = require('../app/http/controllers/CropsController');
const { CreateCropRequest: CreateRequest } = require('../app/http/requests/crops/CreateCropRequest');
const { ListCropsRequest: ListRequest } = require('../app/http/requests/crops/ListCropsRequest');
const { RetrieveCropRequest: GetRequest } = require('../app/http/requests/crops/RetrieveCropRequest');
const { UpdateCropRequest: UpdateRequest } = require('../app/http/requests/crops/UpdateCropRequest');
const { DeleteCropRequest: DeleteRequest } = require('../app/http/requests/crops/DeleteCropRequest');
const SynonymsRouter = require('./synonyms');
const Public = require('../app/http/middleware/Public');
/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = CropsController.factory();

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
 * Because we are using this router as a subrouter in crops, we dont want to auto-generate routes for /synonyms.
 * we accomplish this by adding synonyms.js to the exlcude array in the app/providers/RouterProvider.js file.
 */
router.use(SynonymsRouter)

module.exports =  router



