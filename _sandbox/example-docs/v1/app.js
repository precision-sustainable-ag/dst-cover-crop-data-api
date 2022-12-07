const express = require('express');
const {Router:ExpressRouter} = require('express');
const { EditRequest } = require('./EditRequest');
const {Request} = require('./Request');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc.json');
const { Resource } = require('./Resource');

const options = {
  explorer: true
};


const app = express();

function one(req,res,next){
    console.log('one');
    next();
}
function two(req,res,next){
    console.log('two');
    next();
}
function three(req,res,next){
    console.log('three');
    next();
}

const pre = []
const post = [three, two, one]


app.use('/middleware-array',pre,(req,res,next)=>{console.log('handled'); next();},post);

app.use('/echo/:id',Request.handle(), (req,res,next)=>{
    res.send(req.validated);
})

app.use('/model',EditRequest.handle(), (req,res,next)=>{
    res.send(req.validated);
})


// const request = new EditRequest();
const requestBody = EditRequest.Blueprint();

console.log(requestBody);
swaggerDocument.paths["/model"] = {
    post:{
        "tags": ["model"],
        "summary":"create",
        "description":"craetes a model in the database and returns back the created model record.",
        "parameters":[],
        "requestBody":requestBody,
        "responses":{
            ...Resource.Blueprint()
        }
    }
}




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.listen(3010,()=>{console.log('server listening ...')})