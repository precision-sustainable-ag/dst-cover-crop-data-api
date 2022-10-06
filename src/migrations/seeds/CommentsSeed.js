
const { Comment } = require('../../app/models/Comment');
const { Post } = require('../../app/models/Post');
const Seed = require('./Seed');
const PostsSeed = require('./PostsSeed');
const { Op } = require('sequelize');



module.exports = class CommentsSeed extends Seed {

    static model(){
        return Comment;
    }

    static async getPosts(){
        const where = {
            title: {
                [Op.in]: []
            },
            body: {
                [Op.in]: []
            }
        };
        const postsData = await PostsSeed.data();
        for(let entry of postsData){
            where.title[Op.in].push(entry.title)
            where.body[Op.in].push(entry.body)
        }

        const posts = await Post.findAll({where});
        return posts;

    }
    
    static async data(){
        const posts = await this.getPosts();
        return [
            {
                title: 'Yeh okay bub',
                body: 'i have a very strong opinion about this, and i really think its my responsibility to inform you on the matter. you are dead wrong pal. Glad i could help you out there buddy!',
                postId: posts[0].id,
            },
            {
                title: 'thats great!',
                body: "Like im lit, but its an omelette! batmn!",
                postId: posts[0].id,
            },
            {
                title: 'heh',
                body: "lol. thats dumb.",
                postId: posts[1].id,
            },
        ];
    }


}