const { Crop } = require('../../models/Crop');
const { Controller } = require('../../../framework/controllers/Controller');
const { Family } = require('../../models/Family');
const { Group } = require('../../models/Group');
const { RecordNotFound } = require('../../exceptions/RecordNotFound');
const { Op } = require('sequelize');
const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const {includes:RetrieveIncludes} = require('../resources/crops/RetrieveCropResource');
const {includes:ListIncludes} = require('../resources/crops/ListCropResource');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');


class CropsController extends Controller {

    async create(req){

        const payload = req.validated.body;

        if(payload?.familyId) { await ValidatorProvider.factory().validateRecordExists({key:'familyId',model:Family,payload}); }
        if(payload?.groupId) { await ValidatorProvider.factory().validateRecordExists({key:'groupId',model:Group,payload}); }

        return await Crop.create(payload)

    }

    async retrieve(req){

        const params = req.validated.params;

        const record = await Crop.findOne({
            where: {
                id: params.id
            },
            include: RetrieveIncludes
        })
        
        if(!record){
            throw new RecordNotFoundError(params,['record not found'])
        }

        return record;
    }

    async list(req){

        const payload = req.validated;

        const where = {
            label: { [Op.iLike]: `%${payload.params?.label ? payload.params.label : ''}%` }
        };

        const rows = await Crop.findAll({
            limit: payload.params.limit,
            offset: payload.params.offset,
            order: [
                ['label']
            ],
            where,
            include: ListIncludes
        });

        const count = await Crop.count({where});

        return {data:rows,count};

    }

    async update(req){

        const params = req.validated.params;
        const payload = req.validated.body;

        if(payload?.familyId ) { await ValidatorProvider.factory().validateRecordExists({key:'familyId',model:Family,payload}); }
        if(payload?.groupId ) { await ValidatorProvider.factory().validateRecordExists({key:'groupId',model:Group,payload}); }

        let resource = await Crop.findOne({
            where: {
                id: params.id
            },
            include: RetrieveIncludes
        })

        if(!resource){
            throw new RecordNotFoundError(payload,['record not found'])
        }

        await resource.update(payload);

        return await resource.reload();

    }

    async delete(req){

        const params = req.validated.params;
        
        const resource = await Crop.findOne({
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
    CropsController
};