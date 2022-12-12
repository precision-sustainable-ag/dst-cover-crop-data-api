const Public = require('../app/http/middleware/Public');
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const { CropsController } = require("../app/http/controllers/CropsController");
const { CreateCropRequest } = require("../app/http/requests/crops/CreateCropRequest");
const { ListCropsRequest } = require("../app/http/requests/crops/ListCropsRequest");
const { RetrieveCropRequest } = require("../app/http/requests/crops/RetrieveCropRequest");
const { CreateCropResource } = require("../app/http/resources/crops/CreateCropResource");
const { ListCropResource } = require("../app/http/resources/crops/ListCropResource");
const { RetrieveCropResource } = require("../app/http/resources/crops/RetrieveCropResource");
const { UpdateCropResource } = require("../app/http/resources/crops/UpdateCropResource");
const { UpdateCropRequest } = require("../app/http/requests/crops/UpdateCropRequest");
const { ImagesController } = require("../app/http/controllers/ImagesController");
const { CreateImageRequest } = require("../app/http/requests/images/CreateImageRequest");
const { ListImagesRequest } = require("../app/http/requests/images/ListImagesRequest");
const { CreateImageResource } = require("../app/http/resources/images/CreateImageResource");
const { ListImagesResource } = require("../app/http/resources/images/ListImagesResource");
const { CreateSynonymRequest } = require("../app/http/requests/synonyms/CreateSynonymRequest");
const { CreateSynonymResource } = require("../app/http/resources/synonyms/CreateSynonymResource");
const { ListSynonymsRequest } = require("../app/http/requests/synonyms/ListSynonymsRequest");
const { ListSynonymsResource } = require("../app/http/resources/synonyms/ListSynonymsResource");
const { SynonymsController } = require("../app/http/controllers/SynonymsController");

module.exports = Router.expose({path:'/crops', routes: [

    Route.post({path:'/', summary:"Create a Crop Object",
        request: CreateCropRequest,
        handler:CropsController.factory().create,
        response: CreateCropResource
    }).middleware([Public]),

    Route.get({path:'/', summary:"Get List of Crop Objects",
        request: ListCropsRequest,
        handler:CropsController.factory().list,
        response: ListCropResource
    }).middleware([Public]),

    Route.get({path:'/{id}', summary:"Retrieve a Crop Object",
        request: RetrieveCropRequest,
        handler: CropsController.factory().retrieve,
        response: RetrieveCropResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Crop Object",
        request: UpdateCropRequest,
        handler:CropsController.factory().update,
        response: UpdateCropResource
    }).middleware([Public]),

    /**
     * Crops Image routes
     */
    Router.expose({path:'/{cropId}/images', tags:['images'], routes: [

        Route.post({path:'/', summary:"Create a Image Object for a given Crop",
            request: CreateImageRequest,
            handler:ImagesController.factory().create,
            response: CreateImageResource
        }).middleware([Public]),
    
        Route.get({path:'/', summary:"Get List of Images Objects for a given Crop",
            request: ListImagesRequest,
            handler:ImagesController.factory().list,
            response: ListImagesResource
        }).middleware([Public]),
    
    ]}),

    /**
     * Synonyms routes
     */
    Router.expose({path:'/{cropId}/synonyms', tags:['synonyms'], routes: [

        Route.post({path:'/', summary:"Create a Synonym Object for a given Crop",
            request: CreateSynonymRequest,
            handler:SynonymsController.factory().create,
            response: CreateSynonymResource
        }).middleware([Public]),

        Route.get({path:'/', summary:"Get List of Synonyms Objects for a given Crop",
            request: ListSynonymsRequest,
            handler:SynonymsController.factory().list,
            response: ListSynonymsResource
        }).middleware([Public]),
    
    ]})



]});
