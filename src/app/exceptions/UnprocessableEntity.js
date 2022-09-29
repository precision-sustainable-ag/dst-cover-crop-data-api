
import { RenderableException } from "./RenderableException.js";

export class UnprocessableEntity extends RenderableException {


    constructor({ data, errors }){
        super();
        this.status = 422;
        this.body = {
            data,
            errors
        };
    }

}