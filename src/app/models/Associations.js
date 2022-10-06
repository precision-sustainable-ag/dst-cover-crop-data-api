const { Comment } = require("./Comment");
const { Post } = require("./Post");

module.exports = [

    { // posts has many comments
        parent: {
            model: Post,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Comment,
            relation: 'belongsTo',
            options:{},
        },
    },

]