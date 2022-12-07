const { Document } = require('../documents/Document');

class Route extends Document {

    /**
     * @param {string} path string value for exposed endpoint path
     * @param {object} {
     *      path: "/example" -- string value for exposed endpoint path, 
     *      request: {
     *          handle: () => { // return ExpressJS Middleware function or array }
     *          document: () => { // OpenAPIv3.0.0 compliant object returning the following object keys.
     *              return {
     *                  parameters: [], // https://spec.openapis.org/oas/v3.0.0#parameter-object
     *                  requestBody: {} // https://spec.openapis.org/oas/v3.0.0#request-body-object
     *              }     
     *          }
     *      }, 
     *      handler: (req,res) => { // custom logic here; return data; }, // express middleware function or array
     *      response: {
     *          render: ()=> { // return ExpressJS Middleware function or array } // this should handle sending the response.
     *          document: () => { // OpenAPIv3.0.0 compliant object returning the following object keys.
     *              return { // responses object https://spec.openapis.org/oas/v3.0.0#responses-object
     *                  
     *              }
     *          }
     *      }, 
     *      summary, 
     *      description
     *  }
     * 
     * @returns {Route} new Route({method:'post', ...}); -- new instantiated instance;
     */
    static get(params){
        const method = 'get';

        if(params?.path) return new this({method, ...params});

        return new this({method,path:params});
    }

    /**
     * @param {string} path string value for exposed endpoint path
     * @param {object} {
     *      path: "/example" -- string value for exposed endpoint path, 
     *      request: {
     *          handle: () => { // return ExpressJS Middleware function or array }
     *          document: () => { // OpenAPIv3.0.0 compliant object returning the following object keys.
     *              return {
     *                  parameters: [], // https://spec.openapis.org/oas/v3.0.0#parameter-object
     *                  requestBody: {} // https://spec.openapis.org/oas/v3.0.0#request-body-object
     *              }     
     *          }
     *      }, 
     *      handler: (req,res) => { // custom logic here; return data; }, // express middleware function or array
     *      response: {
     *          render: ()=> { // return ExpressJS Middleware function or array } // this should handle sending the response.
     *          document: () => { // OpenAPIv3.0.0 compliant object returning the following object keys.
     *              return { // responses object https://spec.openapis.org/oas/v3.0.0#responses-object
     *                  
     *              }
     *          }
     *      }, 
     *      summary, 
     *      description
     *  }
     * 
     * @returns {Route} new Route({method:'post', ...}); -- new instantiated instance;
     */
    static post(params){
        const method = 'post';

        if(params?.path) return new this({method, ...params});

        return new this({method,path:params});
    }

    static put(params){
        const method = 'put';

        if(params?.path) return new this({method, ...params});

        return new this({method,path:params});
    }

    static delete(params){
        const method = 'delete';

        if(params?.path) return new this({method, ...params});

        return new this({method,path:params});
    }

    constructor({method, path, request, handler, response, summary, description,tags=[]}){
        super();
        this.path = path;
        this.tags = tags;
        this.summary = summary;
        this.description = description;
        this.method = method;
        this._document = null
        this._request = request;
        this._response = response;
        this._handler = handler;
    }

    tag(T){
        if(T instanceof Array) this.tags = [...this.tags, ...T];
        else this.tags.push(T);
        return this;
    }

    describe({summary,description}){
        if(summary) this.summary = summary;
        if(description) this.description = description;

        return this;
    }

    validate(){
        return this._request.handle();
    }

    handle(){
        return this._handler
    }

    respond(){
        return this._response.render();
    }

    renderDocument(){
        if(this._renderedDocument) return this._renderedDocument

        return this._renderedDocument = this.buildDocument();
    }

    buildDocument(){
        const document = this._document ?? {};
        const request = this._request;
        const response = this._response;

        if(this.summary) document.summary = this.summary;
        if(this.description) document.description = this.description;
        if(this.tags.length > 0) document.tags = this.tags;

        if(request && request.document && typeof request.document == 'function'){
            const reqDocument = request.document();
            document.parameters = reqDocument.parameters;
            document.requestBody = reqDocument.requestBody;
        }

        if(response && response.document && typeof response.document == 'function'){
            const responses = response.document()?.responses;
            if(responses) document.responses = {
                ...document.responses,
                ...responses
            }
        }
        
        return document;
    }

}

module.exports = { Route }