const express = require('express');

const swaggerUi = require('swagger-ui-express');
const FullOpenAPIDocument = require('./example-docs/full-doc.js');
const PartialOpenAPIDocument = require('./example-docs/partial-doc.js');
const { Route } = require('./Route.js');
const { Router } = require('./Router.js');
const ExamplesDoc = require('./example-docs/examples/index');
const GetExamplesDoc = require('./example-docs/examples/get');
const GetExamplesDoc2 = require('./example-docs/examples/get-2');
const PostExamplesDoc = require('./example-docs/examples/post');
const ExampleRequest = require('./example-docs/examples/requests/test');
const ExampleResponse = require('./example-docs/examples/responses/list');
const { Request } = require('./Request.js');
const { Response } = require('./Response.js');
const { PostRequest } = require('./PostRequest.js');
const { Document } = require('./Document.js');
const { ErrorDocument } = require('./ErrorDocument.js');

const options = {
  explorer: true
};


function iteration0(app){
  app.openapi = FullOpenAPIDocument;
}

function setPartialDoc(app){
  app.openapi = PartialOpenAPIDocument;
}

function iteration1(app){
  const getExamples = Route.get('/examples').document(GetExamplesDoc);
  const postExamples = Route.post('/examples').document(PostExamplesDoc);

  OpenAPIDocument.paths["/examples"] = {
      get: getExamples.document(),
      post: postExamples.document()
  }
}



function iteration2(app){

  const request = {
    handle(){ // validate the incoming request data
      return (req,res,next) => { 
        req.validated = {hello:'world'}; 
        console.log('validated'); 
        next(); 
      }
    }, 
    // overrides request defined in route document
    document:() => ExampleRequest 
  }

  const response = {
      render(){ // send response
        return (req,res) => { 
          console.log('sending',res.data); 
          return res.send(res.data); 
        }
      },
      // overrides responses defined in route document
      document: () => { return {responses: {...ExampleResponse} } }, 
  }

  const router = Router.expose({ path:'/examples',
    routes:[
      Route.get({path:'/', request, response,
        handler: (req,res,next) => { // handle the validated data
          console.log('handling',req.validated);  
          res.data = req.validated; 
          next(); 
        }})
      // this document will override the routers document for the given path: "/examples":{ get: {...} }
      .document(GetExamplesDoc2), 
  ]})
  .document(ExamplesDoc);

  router.register(app);

  app.openapi.paths = {
    ...app.openapi.paths,
    ...router.document(),
  }

}

function iteration3(app){

  const router = Router.expose({ path:'/examples',
    routes:[

      // this routes documentation is provided through the ExamplesDoc
      Route.get({path:'/',
        request: {handle: () => (req,res,next) => { console.log('validating request:',req.url); req.validated = {test:req.query.test}; next(); }},
        handler: (req,res,next) => { console.log('handling request:',req.url); res.data = req.validated; next(); },
        response: {render: () => (req,res,next) => { console.log('responding to request:',req.url);  res.send(res.data)}},
      }),
      
      // this routes documentation is provided through the ExamplesDoc
      Route.get({path:'/error',
        request: {handle: () => (req,res,next) => { console.log('validating request:',req.url); req.validated = {test:req.query.test}; next(); }},
        handler: (req,res,next) => { throw new ErrorDocument() },
        response: {render: () => (req,res,next) => { console.log('responding to request:',req.url);  res.send(res.data)}},
      }),
      
      // self documenting
      Route.get({path:'/:id', 
        request: Request, // request class will override example document.
        handler: async (req,res,next) => { console.log('handling',req.validated); res.data = req.validated; next(); },
        response: Response // response class will override example document.
      }),

      // self documenting
      Route.post({path:'/',
        request: PostRequest,
        handler: async (req,res,next) => { console.log('handling',req.validated); res.data = req.validated; next(); },
        response: Response // response class will override example document.
      })

  ]}).document(ExamplesDoc);

  router.register(app);


  app.openapi.paths = {
    ...app.openapi.paths,
    ...router.document(),
  }


}


const app = express();

// iteration0(app);

const errDoc = new ErrorDocument();
console.log(errDoc instanceof Error);

setPartialDoc(app);
iteration3(app)
// iteration2(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(app.openapi, options));


// app.use('/error',(req,res,next)=>{throw new Error('lol');})

app.use((err, req, res, next) => {

  console.log('caught error',err.message);
  if(err.render) return err.render(res);
  return res.send({error:err.message, doc: (typeof err.document) , stack:err.stack});
});

app.listen(3011,()=>{console.log('server listening ...')})