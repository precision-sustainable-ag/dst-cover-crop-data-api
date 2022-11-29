const { Family } = require('../../models/Family');
const { Controller } = require('../../../framework/controllers/Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');

const include = [];

class FamiliesController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await Family.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Family.findOne({
            where: {
                id: payload.id
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Family.findAll({
            limit: payload.limit,
            offset: payload.offset,
            include
        });

        const count = await Family.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Family.findOne({
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
        
        const resource = await Family.findOne({
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
    FamiliesController
};