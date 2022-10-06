const CommentsSeed = require("./CommentsSeed");
const PostsSeed = require("./PostsSeed");


const Seeds = [
    PostsSeed,
    CommentsSeed
];

module.exports = class Seeder {

    static async sow(){

        for(let seed of Seeds){
    
            const data = await seed.plant();
    
        }
    }
}
