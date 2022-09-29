
import { RenderableException } from "./RenderableException.js";

export class ForbiddenAccess extends RenderableException {

    constructor(){
        super();
        this.status = 403;
        this.body = {
            errors: ['Forbidden Access Attempt']
        };
    }

}