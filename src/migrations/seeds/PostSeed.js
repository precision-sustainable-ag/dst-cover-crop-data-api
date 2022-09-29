
import Post from '../../app/models/Post.js'
import Seed from './Seed.js'

export default class PostsSeed extends Seed {

    static model(){
        return Post;
    }
    
    static data(){

        return [
            {title:'simple test post',body:'sample body for a sample post...'},
            {title:'another awesome post!',body:'something really interesting and attention grabbing!'},
            {title:'melancholy post',body:'up on melancholy hill theres a platic tree.'},
        ];

    }

}