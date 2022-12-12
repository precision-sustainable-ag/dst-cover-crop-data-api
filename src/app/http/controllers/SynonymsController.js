const { Synonym } = require('../../models/Synonym');
const { Controller } = require('../../../framework/controllers/Controller');
const { RecordNotFound } = require('../../exceptions/RecordNotFound');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [];

class SynonymsController extends Controller {

    async create(req){

        const payload = req.validated.body;

        const resource = await Synonym.create(payload);

        return resource;

    }

    async retrieve(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Synonym.findOne({
            where: {
                id: params.synonymId,
                cropId: params.cropId,
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

        const rows = await Synonym.findAll({
            limit: params.limit,
            offset: params.offset,
            where: {
                cropId: params.cropId,
            },
            include
        });

        const count = await Synonym.count();
        
        return {data:rows, count};

    }

    async update(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Synonym.findOne({
            where: {
                id: params.synonymId,
                cropId: params.cropId,
            },
            include
        })

        if(!resource) {
            throw new RecordNotFound({data:payload});
        }

        await resource.update(payload);

        return resource;

    }

    async delete(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;
        
        const resource = await Synonym.findOne({
            where: {
                id: params.synonymId,
                cropId: params.cropId,
            },
            include
        })

        if(!resource) {
            throw new RecordNotFound({data:payload});
        }

        await resource.destroy();

        return resource;
    }

}

module.exports = {
    SynonymsController
};