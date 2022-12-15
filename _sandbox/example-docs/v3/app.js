const express = require('express');
const swaggerUi = require('swagger-ui-express');
const doc = require('./docs/partial-doc');
const options = {
    explorer: true
};

const Iteration1 = require('./examples/iteration-1');
const Iteration2 = require('./examples/iteration-2');
const { RenderableException } = require('./framework/errors/RenderableError');
  


const app = express();
app.openapi = doc;


// examples go here
// Iteration1(app);
Iteration2(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(app.openapi, options));

app.use((err, req, res, next) => {

    console.log('caught error',err);
    if(err.render) return err.render(res);
    return res.send({error:err.message, doc: (typeof err.document) , stack:err.stack});

});
  

app.listen(3011,()=>{console.log('server listening ...')})