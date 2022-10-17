const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { ImagesController } = require('../app/http/controllers/ImagesController');
const { CreateImageRequest: CreateRequest } = require('../app/http/requests/images/CreateImageRequest');
const { ListImagesRequest: ListRequest } = require('../app/http/requests/images/ListImagesRequest');
const { RetrieveImageRequest: GetRequest } = require('../app/http/requests/images/RetrieveImageRequest');
const { UpdateImageRequest: UpdateRequest } = require('../app/http/requests/images/UpdateImageRequest');
const { DeleteImageRequest: DeleteRequest } = require('../app/http/requests/images/DeleteImageRequest');
const Public = require('../app/http/middleware/Public');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = ImagesController.factory();

const router = Router();

/**
 * all get requests are 100% open to public
 */
router.get('/:cropId/images', Public, ListRequest.handle(),Controller.list);
router.get('/:cropId/images/:imageId', Public, GetRequest.handle(),Controller.retrieve);

/**
 * All requests that edit data must have
 * a data-entry authorization token with the required scopes.
 */
router.post('/:cropId/images', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.put('/:cropId/images/:imageId', Public, UpdateRequest.handle(),Controller.update);
router.delete('/:cropId/images/:imageId', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



