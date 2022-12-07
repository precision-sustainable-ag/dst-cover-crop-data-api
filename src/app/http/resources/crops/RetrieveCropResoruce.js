
const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { RecordNotFoundError } = require('../../../../framework/errors/RecordNotFoundError');
const { Resource } = require('../../../../framework/resources/Resource');
const { Crop } = require('../../../models/Crop');
const { Family } = require('../../../models/Family');
const { Group } = require('../../../models/Group');
const { Image } = require('../../../models/Image');
const { Synonym } = require('../../../models/Synonym');


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
        synonyms: record.synonyms,
        thumbnail: thumbnail[0] ?? null,
        ...add
    }
}

const includes = [
    Image, Family, Group, Synonym
]

class RetrieveCropResoruce extends Resource {


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
        const schema = Crop.schema({exclude:['groupId','familyId']})
        schema.properties = {
            ...schema.properties,
            thumbnail: Image.schema({}),
            family: Family.schema({}),
            group: Group.schema({}),
            images: {
                type:'array',
                items: Image.schema({})
            },
            synonyms: {
                type:'array',
                items: Synonym.schema({})
            }

        }
        return schema;
    }

    build(res,req){
        const data = res.data;
        res.data = transform(data,{images:data.images});
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            RecordNotFoundError,
            InternalServerError,
        ]
    }


}

module.exports = {
    RetrieveCropResoruce, includes
}