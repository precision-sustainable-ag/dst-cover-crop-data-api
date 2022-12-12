const { SynonymsController } = require("../app/http/controllers/SynonymsController");
const { DeleteSynonymRequest } = require("../app/http/requests/synonyms/DeleteSynonymRequest");
const { RetrieveSynonymRequest } = require("../app/http/requests/synonyms/RetrieveSynonymRequest");
const { UpdateSynonymRequest } = require("../app/http/requests/synonyms/UpdateSynonymRequest");
const { DeleteSynonymResource } = require("../app/http/resources/synonyms/DeleteSynonymResource");
const { RetrieveSynonymResource } = require("../app/http/resources/synonyms/RetrieveSynonymResource");
const { UpdateSynonymResource } = require("../app/http/resources/synonyms/UpdateSynonymResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/synonyms', routes: [

    Route.get({path:'/{id}', summary:"Retrieve a Synonym Object",
        request: RetrieveSynonymRequest,
        handler: SynonymsController.factory().retrieve,
        response: RetrieveSynonymResource
    }).middleware([Public]),

    Route.put({path:'/{id}', summary:"Update a Synonym Object",
        request: UpdateSynonymRequest,
        handler:SynonymsController.factory().update,
        response: UpdateSynonymResource
    }).middleware([Public]),

    Route.delete({path:'/{id}', summary:"Delete a Synonym Object",
        request: DeleteSynonymRequest,
        handler:SynonymsController.factory().delete,
        response: DeleteSynonymResource
    }).middleware([Public]),

]});
