
const { RenderableException } = require('./RenderableException');

class UnprocessableEntity extends RenderableException {


    constructor(){
        super();

    }

    status(){
        return 422;
    }

    wrapperSchema(){
        const type = this.type();
        const data = {type};
        if(type == 'object') data.properties = {};
        else data.items = {};

        return {
            type: 'object',
            properties: {
                data: { type: "object" },
                schema: {
                    
                },

            }
        }
    }

}

module.exports = {
    UnprocessableEntity
}