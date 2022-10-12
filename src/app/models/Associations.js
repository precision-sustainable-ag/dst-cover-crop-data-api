const { Crop } = require("./Crop");
const { CropsZone } = require("./CropsZone");
const { Family } = require("./Family");
const { Group } = require("./Group");
const { Region } = require("./Region");
const { Synonym } = require("./Synonym");
const { Zone } = require("./Zone");
const { Image } = require("./Image");

module.exports = [

    { // crop belongs to family
        parent: {
            model: Family,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Crop,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // crop belongs to group
        parent: {
            model: Group,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Crop,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // regions have many zones
        parent: {
            model: Region,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Zone,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // crops have many images
        parent: {
            model: Crop,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Image,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // regions have many images
        parent: {
            model: Region,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Image,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // crops have many synonyms
        parent: {
            model: Crop,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: Synonym,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // crops have many crops_zones
        parent: {
            model: Crop,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: CropsZone,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // zones have many crops_zones
        parent: {
            model: Zone,
            relation: 'hasMany',
            options:{},
        },
        child: {
            model: CropsZone,
            relation: 'belongsTo',
            options:{},
        },
    },

    { // crop belongs to many zones through crops_zones
        parent: {
            model: Crop,
            relation: 'belongsToMany',
            options:{
                through: CropsZone
            },
        },
        child: {
            model: Zone,
            relation: 'belongsToMany',
            options:{
                through: CropsZone
            },
        },
    },

]