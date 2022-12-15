const { Region } = require('../../models/Region');
const { Controller } = require('../../../framework/controllers/Controller');
const { Zone } = require('../../models/Zone');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [];

class RegionsController extends Controller {

    async create(req){

        const payload = req.validated.body;
        payload.include = include;

        const resource = await Region.create(payload);

        return resource;

    }

    async retrieve(req){

        const params = req.validated.params;

        const resource = await Region.findOne({
            where: {
                id: params.id
            },
            include: [Zone]
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        return resource;

    }

    async list(req){

        const params = req.validated.params;

        const rows = await Region.findAll({
            limit: params.limit,
            offset: params.offset,
            include
        });

        const count = await Region.count();
        
        return {data:rows,count};

    }

    async update(req){

        const payload = req.validated.body;
        const params = req.validated.params;

        const resource = await Region.findOne({
            where: {
                id: params.id
            },
            include
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        await resource.update(payload);

        return resource;
    }

    async delete(req){

        const params = req.validated.params;
        
        const resource = await Region.findOne({
            where: {
                id: params.id
            },
            include
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        await resource.destroy();

        return resource;
    }

}

module.exports = {
    RegionsController
};