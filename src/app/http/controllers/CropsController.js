const { Crop } = require('../../models/Crop');
const { Controller } = require('../../../framework/controllers/Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { Family } = require('../../models/Family');
const { Group } = require('../../models/Group');
const { Image } = require('../../models/Image');
const { RecordNotFound } = require('../../exceptions/RecordNotFound');
const { Synonym } = require('../../models/Synonym');
const { Op } = require('sequelize');
const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const app = require('../../../config/app');

const include = [
    {model:Family, attributes:['id','commonName','scientificName']}, 
    {model:Group, attributes:['id','label']},
    { model:Image },
];

const transform = (record, add={}) => {
    const thumbnail = record.images.filter(image => image.isThumbnail)
    return {
        id: record.id,
        label: record.label,
        scientificName: record.scientificName,
        usdaSymbol: record.usdaSymbol,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        family: record.family,
        group: record.group,
        thumbnail: thumbnail[0] ?? null,
        ...add
    }
}

class CropsController extends Controller {



    async create(req){

        const payload = req.validated;

        if(payload?.familyId) { await ValidatorProvider.factory().validateRecordExists({key:'familyId',model:Family,payload}); }
        if(payload?.groupId) { await ValidatorProvider.factory().validateRecordExists({key:'groupId',model:Group,payload}); }

        const resource = await Crop.create(payload)

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const record = await Crop.findOne({
            where: {
                id: payload.id
            },
            include: [
                ...include,
                {model:Synonym}
            ]
        })
        
        if(!record) throw new RecordNotFound({data:payload});

        const resource = transform(record,{images:record.images});

        if(!resource){
            throw new RecordNotFound({data:payload})
        }

        return new Resource({resource});
    }

    async list(req){

        const payload = req.validated;

        const where = {
            label: { [Op.iLike]: `%${payload?.label ? payload.label : ''}%` }
        };

        const rows = await Crop.findAll({
            limit: payload.limit,
            offset: payload.offset,
            order: [
                ['label']
            ],
            where,
            include
        });

        const count = await Crop.count({where});

        const resource = rows.map(crop => transform(crop));
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        if(payload?.familyId) { await ValidatorProvider.factory().validateRecordExists({key:'familyId',model:Family,payload}); }
        if(payload?.groupId) { await ValidatorProvider.factory().validateRecordExists({key:'groupId',model:Group,payload}); }

        const resource = await Crop.findOne({
            where: {
                id: payload.id
            },
            include
        })

        if(!resource){
            throw new RecordNotFound({data:payload})
        }

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await Crop.findOne({
            where: {
                id: payload.id
            },
            include
        })

        if(!resource){
            throw new RecordNotFound({data:payload})
        }

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    CropsController
};