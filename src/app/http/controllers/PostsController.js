import { Controller } from './Controller.js'


export default class PostsController extends Controller {

    create(req){
        return req.body;
    }

    list(req){
        return [{one:'two'},{three:'four'}]
    }

}
