import Request from '../Request.js';

export default class CreateRequest extends Request {

    rules(){
        return {
            title: 'required|string'
        }
    }

}