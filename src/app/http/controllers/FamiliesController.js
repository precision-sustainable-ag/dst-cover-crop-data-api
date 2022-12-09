const { Family } = require('../../models/Family');
const { Controller } = require('../../../framework/controllers/Controller');
const { RecordNotFound } = require('../../exceptions/RecordNotFound');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [];

class FamiliesController extends Controller {

    async create(req){

        const payload = req.validated.body;

        return await Family.create(payload);

    }

    async retrieve(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Family.findOne({
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

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const rows = await Family.findAll({
            limit: params.limit,
            offset: params.offset,
            include
        });

        const count = await Family.count();
        
        return {data:rows, count}

    }

    async update(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Family.findOne({
            where: {
                id: params.id
            },
            include
        })

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }

        await resource.update(payload);

        return resource.reload();
    }

    async delete(req){

        
        const params = req.validated.params;
        
        const resource = await Family.findOne({
            where: {
                id: params.id
            },
            include
        })

        if(!resource){
            throw new RecordNotFoundError(params,['record not found'])
        }
        
        await resource.destroy();

        return resource;
    }

}

module.exports = {
    FamiliesController
};