
import {Router} from 'express'
import PostsController from '../app/http/controllers/PostsController.js'
import CreatePostRequest from '../app/http/requests/posts/CreateRequest.js'

const Controller = PostsController.factory();

const router = Router();

router.post('/',  CreatePostRequest.handle(), Controller.create);

router.get('/', Controller.list);

export default router

