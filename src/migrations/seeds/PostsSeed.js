
const { Post } = require('../../app/models/Post');
const Seed = require('./Seed');



module.exports = class PostsSeed extends Seed {

    static model(){
        return Post;
    }
    
    static async data(){
        return [
            {
                title: 'My Very First Post!',
                body: 'What did the egg yell at the frat party? OMELETTE!',
            },
            {
                title: 'Another One',
                body: "My mom didn't like my report card .. I said okay. She said: I want more A's. I said Okaaaaaaaay",
            },
        ];
    }


}