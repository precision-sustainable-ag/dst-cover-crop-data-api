const { CropsZone } = require('../../models/CropsZone');
const { Controller } = require('../../../framework/controllers/Controller');
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

        
        const params = req.validated.params;
        const payload = req.validated.body;
        payload.zoneId = params.zoneId;
        payload.cropId = params.cropId;

        console.log('crops zone',params,payload);

        let resource = await CropsZone.findOne({
            where: {
                cropId: params.cropId,
                zoneId: params.zoneId,
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

        return resource;
    }

    async retrieve(req){

        
        const params = req.validated.params;

        const resource = await CropsZone.findOne({
            where: {cropId:params.cropId,zoneId:params.zoneId},
            include
        })

        return resource;
    }

    async list(req){

        
        const params = req.validated.params;

        // this specifically references the crop include
        // by index. if the array arrangement is changed
        // this MUST also be changed.
        if(params?.label) include[1].where = {
            label: { [Op.iLike]: `%${params.label}%` }
        };

        const {count, rows} = await CropsZone.findAndCountAll({
            limit: params.limit,
            offset: params.offset,
            where:{ zoneId: params.zoneId },
            include,
            attributes:[],
        });

        const resource = rows.map(cropsZone => transform(cropsZone.crop));

        return {data:resource,count};
    }

    async listRecords(req) {

        
        const params = req.validated.params;

        const {count, rows} =  await CropsZone.findAndCountAll({
            limit: params.limit,
            offset: params.offset,
            paranoid:false
        });

        return {data:rows, count};

    }

    async delete(req){

        
        const params = req.validated.params;
        
        const resource = await CropsZone.findOne({
            where: {cropId:params.cropId,zoneId:params.zoneId},
            include
        })

        await resource.destroy();

        return resource;
    }

}

module.exports = {
    CropsZonesController
};