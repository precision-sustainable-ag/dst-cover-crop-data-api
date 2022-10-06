const { Post } = require('../../models/Post');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');


class PostsController extends Controller {

    async create(req){

        const payload = req.validated;
        console.log('payload',payload)
        const resource = await Post.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Post.findOne({
            where: {
                id: payload.id
            }
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Post.findAll({
            limit: payload.limit,
            offset: payload.offset
        });

        const count = await Post.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Post.findOne({
            where: {
                id: payload.id
            }
        })

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Post.findOne({
            where: {
                id: payload.id
            }
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports =  {
    PostsController
}
