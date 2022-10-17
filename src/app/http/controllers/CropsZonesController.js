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


const CropInclude = [
    {model:Family, attributes:['id','commonName','scientificName']}, 
    {model:Group, attributes:['id','label']},
    { model:Image },
];

const include = [
    Zone,
    {
        model: Crop,
        include: CropInclude
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
        const collection = await CropsZone.findAll({
            limit: payload.limit,
            offset: payload.offset,
            where:{ zoneId: payload.zoneId },
            include,
            attributes:[],
        });

        // save zone information into meta object
        if(collection.length > 0){
            meta.zone = collection[0].zone;
        }

        const resource = collection.map(cropsZone => transform(cropsZone.crop));

        const count = await CropsZone.count({where:{ zoneId: payload.zoneId }});
        
        return new PaginatedCollection({resource, count, meta});

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