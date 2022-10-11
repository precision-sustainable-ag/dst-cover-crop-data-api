const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { SynonymsController } = require('../app/http/controllers/SynonymsController');
const { CreateSynonymRequest: CreateRequest } = require('../app/http/requests/synonyms/CreateSynonymRequest');
const { ListSynonymsRequest: ListRequest } = require('../app/http/requests/synonyms/ListSynonymsRequest');
const { RetrieveSynonymRequest: GetRequest } = require('../app/http/requests/synonyms/RetrieveSynonymRequest');
const { UpdateSynonymRequest: UpdateRequest } = require('../app/http/requests/synonyms/UpdateSynonymRequest');
const { DeleteSynonymRequest: DeleteRequest } = require('../app/http/requests/synonyms/DeleteSynonymRequest');
const Public = require('../app/http/middleware/Public');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = SynonymsController.factory();

/**
 * Because we are using this router as a subrouter in crops, we dont want to auto-generate routes for /synonyms.
 * we accomplish this by adding synonyms.js to the exlcude array in the app/providers/RouterProvider.js file.
 */
const router = Router();

/**
 * all get requests are 100% open to public
 */
router.get('/:cropId/synonyms', Public, ListRequest.handle(),Controller.list);
router.get('/:cropId/synonyms/:synonymId', Public, GetRequest.handle(),Controller.retrieve);

/**
 * All requests that edit data must have
 * a data-entry authorization token with the required scopes.
 */
router.post('/:cropId/synonyms', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.put('/:cropId/synonyms/:synonymId', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:cropId/synonyms/:synonymId', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



