const { CropsZone } = require('../../models/CropsZone');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { Zone } = require('../../models/Zone');
const { Crop } = require('../../models/Crop');
const { Family } = require('../../models/Family');
const { Group } = require('../../models/Group');
const { Image } = require('../../models/Image');
const { Op } = require('sequelize');


const CropInclude = [
    {model:Family, attributes:['id','commonName','scientificName']}, 
    {model:Group, attributes:['id','label']},
    { model:Image },
];

// list function depends on this order. 
// items can be added below, but the order 
// of the first two elements should not be changed.
const include = [
    Zone,
    {
        model: Crop,
        include: CropInclude,
    }
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


class CropsZonesController extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        let resource = await CropsZone.findOne({
            where: {
                cropId: payload.cropId,
                zoneId: payload.zoneId,
            },
            include,
            paranoid:false,
        });

        if(!resource){
            resource = await CropsZone.create(payload);
        }
        else if(resource.isSoftDeleted()){
            await resource.restore({include});
        }

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await CropsZone.findOne({
            where: payload,
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;
        const meta = {};

        // this specifically references the crop include
        // by index. if the array arrangement is changed
        // this MUST also be changed.
        if(payload?.label) include[1].where = {
            label: { [Op.iLike]: `%${payload.label}%` }
        };

        const {count, rows} = await CropsZone.findAndCountAll({
            limit: payload.limit,
            offset: payload.offset,
            where:{ zoneId: payload.zoneId },
            include,
            attributes:[],
        });

        // save zone information into meta object
        if(rows.length > 0){
            meta.zone = rows[0].zone;
        }

        const resource = rows.map(cropsZone => transform(cropsZone.crop));

        return new PaginatedCollection({resource, count, meta});

    }

    async listRecords(req) {

        const payload = req.validated;

        const {count, rows} =  await CropsZone.findAndCountAll({
            limit: payload.limit,
            offset: payload.offset,
            paranoid:false
        });

        return new PaginatedCollection({resource:rows, count});
    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await CropsZone.findOne({
            where: payload,
            include
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    CropsZonesController
};