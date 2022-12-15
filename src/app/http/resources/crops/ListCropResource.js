
const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { Collection } = require('../../../../framework/resources/Collection');
const { PaginatedCollection } = require('../../../../framework/resources/PaginatedCollection');
const { Crop } = require('../../../models/Crop');
const { Family } = require('../../../models/Family');
const { Group } = require('../../../models/Group');
const { Image } = require('../../../models/Image');

const includes = [
    Family, Group, Image
]

const transform = (record) => {
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
        synonyms: record.synonyms,
        thumbnail: thumbnail[0] ?? null,
    }
}


class ListCropResource extends PaginatedCollection {


    status(){
        return 200
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Crop Object";
    }

    schema(){
        return {
            type:'object',
            properties:{
                ...Crop.schema({exclude:['groupId','familyId']}).properties,
                thumbnail: Image.schema({}),
                family: Family.schema({}),
                group: Group.schema({}),
            }
        }
    }


    build(res,req){
        res.data = res.data.map(crop => transform(crop));
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            InternalServerError,
        ]
    }


}

module.exports = {
    ListCropResource, includes
}