const { CropsZone } = require('../../models/CropsZone');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');
const { Zone } = require('../../models/Zone');
const { Crop } = require('../../models/Crop');

const include = [Zone,Crop];

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

        const resource = collection.map(cropsZone => cropsZone.crop);

        const count = await CropsZone.count();
        
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