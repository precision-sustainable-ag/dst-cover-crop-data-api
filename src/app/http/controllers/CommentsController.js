const { Controller } = require('./Controller');
const { Post } = require('../../models/Post');
const { Comment } = require('../../models/Comment');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { ValidatorProvider} = require('../../providers/ValidatorProvider');


class CommentsController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.postId = req.params.postId;

        await ValidatorProvider.factory().validateRecordExists({key:'postId',model:Post,payload});

        const resource = await Comment.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Comment.findOne({
            where: {
                id: payload.id
            }
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Comment.findAll({
            limit: payload.limit,
            offset: payload.offset,
            where: {
                postId: req.params.postId
            }
        });

        const count = await Comment.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Comment.findOne({
            where: {
                id: payload.id,
                postId: req.params.postId,
            }
        })

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Comment.findOne({
            where: {
                id: payload.id
            }
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports =  {
    CommentsController
}