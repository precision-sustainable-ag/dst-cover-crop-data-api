const {Document} = require("./Document");
const {Request} = require('./Request');

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
     *      handler: (req,res) => { // custom logic here; return data; }, 
     *      response: {
     *          render: (req, res) => { const data = res.data; // custom formating here; return formattedData; }
     *          document: () => { // OpenAPIv3.0.0 compliant object returning the following object keys.
     *              return {
     *                  response: {} // https://spec.openapis.org/oas/v3.0.0#responses-object
     *              }
     *          }
     *      }, 
     *      summary, 
     *      description
     *  }
     * 
     * @returns {Route} new Route({method:'get', ...}); -- new instantiated instance;
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
     *      handler: (req,res) => { // custom logic here; return data; }, 
     *      response: {
     *          render: (req, res) => { const data = res.data; // custom formating here; return formattedData; }
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

    constructor({method, path, request, handler, response, summary, description}){
        super();
        this.path = path;
        this.summary = summary;
        this.description = description;
        this.method = method;
        this._document = null
        this._request = request;
        this._response = response;
        this._handler = handler;
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
        console.log('doc',document);
        const request = this._request;
        const response = this._response;

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