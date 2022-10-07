const { Crop } = require("./Crop");
const { Family } = require("./Family");
const { Group } = require("./Group");

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

]