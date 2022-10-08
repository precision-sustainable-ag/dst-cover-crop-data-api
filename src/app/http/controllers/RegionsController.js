const { Region } = require('../../models/Region');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { Zone } = require('../../models/Zone');

const include = [];

class RegionsController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await Region.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Region.findOne({
            where: {
                id: payload.id
            },
            include: [Zone]
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Region.findAll({
            limit: payload.limit,
            offset: payload.offset,
            include
        });

        const count = await Region.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Region.findOne({
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
        
        const resource = await Region.findOne({
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
    RegionsController
};