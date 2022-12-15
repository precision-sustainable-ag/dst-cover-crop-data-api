const { Image } = require('../../models/Image');
const { Controller } = require('../../../framework/controllers/Controller');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [];

class ImagesController extends Controller {

    async create(req){

        const payload = req.validated.body;

        const resource = await Image.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        
        const params = req.validated.params;

        const resource = await Image.findOne({
            where: {
                id: params.id,
                cropId: params.cropId
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

        const rows = await Image.findAll({
            limit: params.limit,
            offset: params.offset,
            where:{
                cropId: params.cropId,
            },
            include
        });

        const count = await Image.count();
        
        return {data:rows, count};
    }

    async update(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Image.findOne({
            where: {
                id: params.id,
                cropId: params.cropId
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

        
        const params = req.validated.params;
        
        const resource = await Image.findOne({
            where: {
                id: params.id,
                cropId: params.cropId
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
    ImagesController
};