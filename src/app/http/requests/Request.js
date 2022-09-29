import { Validate } from "../../support/helpers/validator.js";
import BodyParser from 'body-parser'

export default class Request {


    rules(){
        return {}
    }

    parser(){
        return BodyParser.json();
    }
    
    data(req){
        if(req.method == 'GET'){
            return this._data = req.params;
        }
        return this._data = req.body;
    }

    validate() {
        const _instance = this;
        return (req,res,next) => {
            const rules = _instance.rules(req);
            const data = _instance.data(req);
            Validate({data,rules});
            return next();
        };
    }

    static handle(){
        const _instance = new this();

        return [
            _instance.parser(),
            _instance.validate()
        ];
    }

}