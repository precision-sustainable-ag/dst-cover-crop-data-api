const bodyParser = require("body-parser");
// const { ValidatorService } = require("../../src/app/services/validation/ValidatorService");
const { Resource } = require("./Resource");
const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true})

const addFormats = require("ajv-formats");
const { Request } = require("./Request");

addFormats(ajv)


const MIDDLEWARE_HOOKS = {
    beforeHandler: [],
    afterHandler: [],
    beforeValidation: [],
    afterValidation: [],
};


class Route {

    static get(path){
        return new this('get',path);
    }

    static post(path){
        return new this('post',path);
    }

    static put(path){
        return new this('put',path);
    }
    
    static delete(path){
        return new this('delete',path);
    }

    constructor(method, path){
        console.log('Creating',method,path);
        this.method = method;
        this.path = path;
        this._middleware = {...MIDDLEWARE_HOOKS};
        this._request = null;
        this._handler = null;
        this._resource = null;
    }

    prefix(path){
        this.path = path + this.path;
        if(this.path.slice(-1) == '/') this.path = this.path.slice(0,-1);
        return this;
    }
    describe({summary,description}){
        this.summary = summary;
        this.description = description;
        return this;
    }

    middleware({beforeHandler=[],afterHandler=[],beforeValidation=[],afterValidation=[]}){
        this._middleware.beforeHandler.concat(beforeHandler);
        this._middleware.afterHandler.concat(afterHandler);
        this._middleware.beforeValidation.concat(beforeValidation);
        this._middleware.afterValidation.concat(afterValidation);
        return this;
    }

    beforeHandler(){
        return this._middleware.beforeHandler;
    }

    afterHandler(){
        return this._middleware.afterHandler;
    }

    beforeValidation(){
        return this._middleware.beforeValidation;
    }

    afterValidation(){
        return this._middleware.afterValidation;
    }

    validator({request, schema}){
        if(request) this._validator = request;
        else {
            this.schema = schema;
            this._validator = [
                bodyParser.json(), bodyParser.urlencoded({extended:true}),
                (req, res, next) => {
                    const data = { ...req.params, ...req.query, ...req.body }

                    const valid = ajv.validate(schema, data);
                    if(valid) req.validated = data;
                    if (!valid) {
                        console.log('errors',ajv.errors)
                        throw new Error("bad validation");
                    }

                    next();
                }
            ]
        }
        return this;
    }

    handler(handler){
        this._handler = handler;
        return this;
    }

    resource(resource){
        this._resource = resource;
        return this;
    }

    getPath(){
        return this.path;
    }

    getValidator(){
        return this._validator;
    }

    getHandler(){
        return this._handler;
    }

    getResource(){
        return this._resource;
    }

    validate(){
        return this.getValidator();
    }

    handle(){
        const handler = this.getHandler();

        return async (req,res,next) => {
            try {

                res.data = await handler(req,res);
                next();

            } catch(err){
                next(err);
            }
        } 
    }

    /**
     * renders a Resource class
     * or calls res.send(res.data)
     */
    respond(){
        const resource = this.getResource();
        if(resource.prototype instanceof Resource) return resource.render

        return (req,res,next) => {
            res.send(res.data);
        }
    }

    document(doc){
        this.doc = doc;
    }

    /**
     * 
        summary: route.summary,
        description: route.description,
        parameters: route.parameters(),
        requestBody: route.requestBody(),
        responses: route.responses(),
     */
    blueprint(){
        if(this.doc) return this.doc;
        const resource = this.getResource();
        const validator = this.getValidator();
        let request = {parameters:[], requestBody:{}};
        request = validator.blueprint();
        console.log('REQ',request)
        console.log(resource.blueprint())
        return {
            summary: this.summary ?? '',
            description: this.description ?? '',
            parameters: request.parameters,
            requestBody: request.requestBody,
            responses: {
                ...resource.blueprint(),
            }
        }
    }

}

module.exports = {Route};