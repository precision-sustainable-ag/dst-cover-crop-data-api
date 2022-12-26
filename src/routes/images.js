const { ImagesController } = require("../app/http/controllers/ImagesController");
const { RetrieveImageRequest } = require("../app/http/requests/images/RetrieveImageRequest");
const { UpdateImageRequest } = require("../app/http/requests/images/UpdateImageRequest");
const { DeleteImageRequest } = require("../app/http/requests/images/DeleteImageRequest");
const { RetrieveImageResource } = require("../app/http/resources/images/RetrieveImageResource");
const { UpdateImageResource } = require("../app/http/resources/images/UpdateImageResource");
const { DeleteImageResource } = require("../app/http/resources/images/DeleteImageResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');
const Auth = require('../app/http/middleware/Auth');

/**
 * creating and getting list of images is in crops router
 * because you can only get images by crops
 * and a image requires a crop to be created.
 */
module.exports = Router.expose({path:'/images', routes: [

    Route.get({path:'/{id}', summary:"Retrieve a Image Object",
        request: RetrieveImageRequest,
        handler: ImagesController.factory().retrieve,
        response: RetrieveImageResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Image Object",
        request: UpdateImageRequest,
        handler:ImagesController.factory().update,
        response: UpdateImageResource
    }).middleware([Auth('data_update')]),

    Route.delete({path:'/{id}', summary:"Delete a Image Object",
        request: DeleteImageRequest,
        handler:ImagesController.factory().delete,
        response: DeleteImageResource
    }).middleware([Auth('data_delete')]),

]});
