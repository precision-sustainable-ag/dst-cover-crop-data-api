
class Router {

    constructor({path, routes}){
        this.path = path;
        this.routes = routes;
        this.paths = {}
    }

    static define({path, routes}){
        return new this({path,routes});
    }

    extend(routes){
        this.routes.concat(routes);
    }

    register(app){
        for(let route of this.routes){
            route.prefix(this.path);

            this.paths[route.path] = route;
            
            app[route.method](
                route.getPath(),
                route.beforeValidation(),
                route.validate(),
                route.afterValidation(),
                route.beforeHandler(),
                route.handle(),
                route.afterHandler(),
                route.respond(),
            );
        }
    }

    /**
     * 
    "/examples": {
      "post":{
        "tags": ["examples"],
        "summary":"create example",
        "description":"",
        "parameters":[],
        "requestBody":{},
        "responses":{}
      },
      ...
    }
     */
    blueprint(){
        const tag = this.path;
        const blueprint = {}
        for(let route of this.routes) {
            const path = route.getPath();
            if(!blueprint[path]) blueprint[path] = {}
            blueprint[path][route.method] = {
                tags: [tag],
                ...route.blueprint()
            }
        }
        return blueprint;
    }


}

module.exports = { Router };