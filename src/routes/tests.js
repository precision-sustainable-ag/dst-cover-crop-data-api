const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { TestsController } = require('../app/http/controllers/TestsController');
const { CreateTestRequest: CreateRequest } = require('../app/http/requests/tests/CreateTestRequest');
const { ListTestsRequest: ListRequest } = require('../app/http/requests/tests/ListTestsRequest');
const { RetrieveTestRequest: GetRequest } = require('../app/http/requests/tests/RetrieveTestRequest');
const { UpdateTestRequest: UpdateRequest } = require('../app/http/requests/tests/UpdateTestRequest');
const { DeleteTestRequest: DeleteRequest } = require('../app/http/requests/tests/DeleteTestRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = TestsController.factory();

const router = Router();

router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



