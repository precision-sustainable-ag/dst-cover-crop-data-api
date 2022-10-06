const { Router } = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const {CommentsController} = require('../app/http/controllers/CommentsController');
const {CreateCommentRequest:CreateRequest} = require('../app/http/requests/comments/CreateCommentRequest');
const {ListCommentsRequest:ListRequest} = require('../app/http/requests/comments/ListCommentsRequest');
const { RetrieveCommentRequest:GetRequest } = require('../app/http/requests/comments/RetrieveCommentRequest');
const {UpdateCommentRequest:UpdateRequest} = require('../app/http/requests/comments/UpdateCommentRequest');
const {DeleteCommentRequest:DeleteRequest} = require('../app/http/requests/comments/DeleteCommentRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = CommentsController.factory();

const router = Router();

router.post('/:postId/comments', HasScopes(['data_create']), CreateRequest.handle(),Controller.create);
router.get('/:postId/comments', HasScopes(['data_read']), ListRequest.handle(),Controller.list);
router.get('/:postId/comments/:id', HasScopes(['data_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:postId/comments/:id', HasScopes(['data_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:postId/comments/:id', HasScopes(['data_delete']), DeleteRequest.handle(),Controller.delete);

module.exports = router;



