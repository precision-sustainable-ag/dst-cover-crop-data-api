const { Zone } = require('../../models/Zone');
const { Controller } = require('../../../framework/controllers/Controller');
const { Region } = require('../../models/Region');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [Region];

class ZonesController extends Controller {

    async create(req){

        const payload = req.validated.body;
        const params = req.validated.params;
        payload.regionId = params.regionId;
        // payload.include = include;

        const resource = await Zone.create(payload);

        return resource;

    }

    async retrieve(req){

        const payload = req.validated.body;
        const params = req.validated.params;

        const resource = await Zone.findOne({
            where: {
                id: params.id
            },
            include
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        return resource;
    }

    async list(req){

        const payload = req.validated.body;
        const params = req.validated.params;

        const rows = await Zone.findAll({
            limit: params.limit,
            offset: params.offset,
            where:{regionId:params.regionId},
            include
        });

        const count = await Zone.count();
        
        return {data:rows, count};
    }

    async update(req){

        const payload = req.validated.body;
        const params = req.validated.params;

        const resource = await Zone.findOne({
            where: {
                id: params.id
            },
            include
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        await resource.update(payload);

        return resource.reload();
    }

    async delete(req){

        const payload = req.validated.body;
        const params = req.validated.params;
        
        const resource = await Zone.findOne({
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
    ZonesController
};