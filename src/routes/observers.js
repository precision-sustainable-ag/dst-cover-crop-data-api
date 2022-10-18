const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { ObserversController } = require('../app/http/controllers/ObserversController');
const { CreateObserverRequest: CreateRequest } = require('../app/http/requests/observers/CreateObserverRequest');
const { ListObserversRequest: ListRequest } = require('../app/http/requests/observers/ListObserversRequest');
const { RetrieveObserverRequest: GetRequest } = require('../app/http/requests/observers/RetrieveObserverRequest');
const { UpdateObserverRequest: UpdateRequest } = require('../app/http/requests/observers/UpdateObserverRequest');
const { DeleteObserverRequest: DeleteRequest } = require('../app/http/requests/observers/DeleteObserverRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = ObserversController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



