const { Image } = require('../../models/Image');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');

const include = [];

class ImagesController extends Controller {

    async create(req){

        const payload = req.validated;

        const resource = await Image.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await Image.findOne({
            where: {
                id: payload.imageId,
                cropId: payload.cropId
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await Image.findAll({
            limit: payload.limit,
            offset: payload.offset,
            where:{
                cropId: payload.cropId,
            },
            include
        });

        const count = await Image.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await Image.findOne({
            where: {
                id: payload.imageId,
                cropId: payload.cropId
            },
            include
        })

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Image.findOne({
            where: {
                id: payload.imageId,
                cropId: payload.cropId
            },
            include
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    ImagesController
};