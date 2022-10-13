const { Test } = require('../../models/Test');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');

const include = [];

class TestsController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await Test.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Test.findOne({
            where: {
                id: payload.id
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Test.findAll({
            limit: payload.limit,
            offset: payload.offset,
            include
        });

        const count = await Test.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Test.findOne({
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
        
        const resource = await Test.findOne({
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
    TestsController
};