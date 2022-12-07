const { Document } = require('../documents/Document');


class Router extends Document {


    static expose({path, routes, tags=[]}){
        return new this({path,routes,tags});
    }

    constructor({path, routes,tags=[]}){
        super()
        this.path = path;
        this.tags = tags;
        this.routes = routes;
    }

    tag(){
        return this.path.replace('/','');
    }

    getRoutes(){
        if(this.map) return this.map;
        const tags = [this.tag(), ...this.tags];
        const map = {};

        for(let route of this.routes){
            let path = this.path + route.path;
            route.tag(tags);
            // remove trailing /
            if(path.slice(-1) == '/') path = path.slice(0,-1);
            if(!map[path]) map[path] = {};
            map[path][route.method] = route
        }

        return this.map = map;
    }

    register(app){
        const routes = this.getRoutes();
        for(let [path,methods] of Object.entries(routes)){
            path = path.replace('{',':').replace('}','');
            for( let [method, route] of Object.entries(methods)){

                app[method](
                    path,
                    route.validate(),
                    route.handle(),
                    route.respond(),
                )

            }
        }
    }

    renderDocument(){
        if(this._renderedDocument) return this._renderedDocument

        return this._renderedDocument = this.buildDocument();
    }


    buildDocument(){
        const document = this._document ?? {};
        const routes = this.getRoutes();

        for(let [path, methods] of Object.entries(routes)) {

            if(!document[path]) document[path] = {};

            for(let [method, route] of Object.entries(methods)){

                if(!document[path][method]) document[path][method] = {};

                if(route.document()) document[path][method] = {
                    ...document[path][method],
                    ...route.document()
                }


            }
        }

        return document;
    }

}

module.exports = { Router }