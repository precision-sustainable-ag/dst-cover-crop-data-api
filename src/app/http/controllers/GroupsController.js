const { Group } = require('../../models/Group');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');

const include = [];

class GroupsController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await Group.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Group.findOne({
            where: {
                id: payload.id
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Group.findAll({
            limit: payload.limit,
            offset: payload.offset,
            include
        });

        const count = await Group.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Group.findOne({
            where: {
                id: payload.id
            },
            include
        })

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Group.findOne({
            where: {
                id: payload.id
            },
            include
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    GroupsController
};