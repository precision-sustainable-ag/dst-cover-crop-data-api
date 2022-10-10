const { Synonym } = require('../../models/Synonym');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { RecordNotFound } = require('../../exceptions/RecordNotFound');

const include = [];

class SynonymsController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await Synonym.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Synonym.findOne({
            where: {
                id: payload.synonymId,
                cropId: payload.cropId,
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Synonym.findAll({
            limit: payload.limit,
            offset: payload.offset,
            where: {
                cropId: payload.cropId,
            },
            include
        });

        const count = await Synonym.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Synonym.findOne({
            where: {
                id: payload.synonymId,
                cropId: payload.cropId,
            },
            include
        })


        if(!resource) {
            throw new RecordNotFound({data:payload});
        }

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Synonym.findOne({
            where: {
                id: payload.synonymId,
                cropId: payload.cropId,
            },
            include
        })

        if(!resource) {
            throw new RecordNotFound({data:payload});
        }

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    SynonymsController
};