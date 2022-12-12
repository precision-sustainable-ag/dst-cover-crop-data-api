const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc.json');
const { Router } = require('./Router');
const { Route } = require('./Route');
const { EditRequest } = require('./EditRequest');
const { Resource } = require('./Resource');

const options = {
  explorer: true
};

/**
 * CREATE EXPRESS APP.
 */
const app = express();
app.document = swaggerDocument;



const router = Router.define({path:'/model',routes:[

    Route.post('/')
        .validator({request:EditRequest})
        .handler((req,res)=>{ return req.validated })
        .resource(Resource)
        .describe({summary:'Create Model', description:'Creates a model class in the database and returns the newly created data.'}),

]});

router.register(app);


app.document.paths = {
  ...app.document.paths,
  ...router.blueprint()
}

// console.log(router.blueprint());

// swaggerDocument.paths = {
//     ...swaggerDocument.paths,
//     ...router.blueprint()
// }
/**
 * 
 * RUN THE APPLICATION
 * 
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(app.document, options));
app.listen(3010,()=>{console.log('server listening ...')})