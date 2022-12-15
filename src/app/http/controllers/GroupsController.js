const { Group } = require('../../models/Group');
const { Controller } = require('../../../framework/controllers/Controller');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

const include = [];

class GroupsController extends Controller {

    async create(req){

        const payload = req.validated.body;

        return await Group.create(payload);


    }

    async retrieve(req){

        
        const params = req.validated.params;

        const resource = await Group.findOne({
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

        const rows = await Group.findAll({
            limit: params.limit,
            offset: params.offset,
            include
        });

        const count = await Group.count();
        
        return {data:rows,count};
    }

    async update(req){

        
        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await Group.findOne({
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
        
        const resource = await Group.findOne({
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
    GroupsController
};