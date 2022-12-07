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
const ImagesRouter = require('./images');


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
router.post('/', Public, CreateRequest.handle(),Controller.create);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

/**
 * Registering sub-routers here. 
 * Make sure to exclude these routers from the app/providers/RotuesProvider.js 
 */
router.use(SynonymsRouter)
router.use(ImagesRouter)

module.exports =  router




