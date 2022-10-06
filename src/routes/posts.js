const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const {PostsController} = require('../app/http/controllers/PostsController');
const {CreatePostRequest:CreateRequest} = require('../app/http/requests/posts/CreatePostRequest');
const {ListPostsRequest:ListRequest} = require('../app/http/requests/posts/ListPostsRequest');
const { RetrievePostRequest:GetRequest } = require('../app/http/requests/posts/RetrievePostRequest');
const {UpdatePostRequest:UpdateRequest} = require('../app/http/requests/posts/UpdatePostRequest');
const {DeletePostRequest:DeleteRequest} = require('../app/http/requests/posts/DeletePostRequest');
const CommentsRouter = require('./comments');
/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = PostsController.factory();

const router = Router();

/**
 * HasScopes can be by-passed by toggling 
 * the routes request handler authorized value to true.
 */
router.post('/', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);
/**
 * Because comments router is a subrouter for posts
 * we should add comments.js to the excluded array in the ModelsProvider.
 */
router.use(CommentsRouter)

module.exports = router



