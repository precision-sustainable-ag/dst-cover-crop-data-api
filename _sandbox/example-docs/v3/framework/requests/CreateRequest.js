const bodyParser = require('body-parser');
const { Example } = require('../models/Example');
const {Request} = require('./Request');


class CreateRequest extends Request {
   
    parser(){
        return bodyParser.json();
    }

    parameters(){
        return [
            {in:'path',name:'token',schema:{type:'string'},required:true},
        ];
    }

    body(){
        return Example.schema({exclude:[{prop:'autoIncrement',value:true}]});
        return {
            type: 'object',
            required:["question","answers"],
            properties:{
                question:{type:"string"},
                answers:{type:'array', items:{type:"string"}}
            },
        }
    }

}

module.exports = { CreateRequest }