const bodyParser = require("body-parser");
const { Model } = require("./Model");
const { Request } = require("./Request");


class EditRequest extends Request {

    /**
     * @returns (req,res,next)=>{...; next();} that parses incoming data.
     */
    parser(){
        return bodyParser.json();
    }

    path(){
        return {
            properties:{
            },
            required:[

            ],
        }
    }

    query(){
        return {
            properties:{
            },
            required:[

            ],
        }
    }

    body(){
        const schema = Model.schema({exclude:[{prop:'autoIncrement',value:true}]});
        console.log('model schema',schema);
        return schema;
    }

}

module.exports = { EditRequest }