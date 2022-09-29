import Post from '../app/models/Post.js'

const MIGRATIONS = [
    Post,
];

for (let migration of MIGRATIONS){

    migration.register();

    migration.sync();

}