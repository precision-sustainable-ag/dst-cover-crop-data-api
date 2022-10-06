const BodyParser = require('body-parser')
const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const { Log } = require('../../providers/LoggingProvider');

class Request  {


    rules(){
        return {}
    }

    parser(){
        return BodyParser.json();
    }
    
    data(req){
        if(req.method == 'GET'){
            return this._data = req.query;
        }
        return this._data = req.body;
    }

    authorized(){
        return false;
    }


    authorize(){
        return (req, res, next) => {

            if(!req.authorized){
                req.authorized = this.authorized();
            }
            next();
        }
    }

    getRules(){
        const rules = this.rules();
        return rules;
    }

    validate() {
        const _instance = this;
        return (req,res,next) => {
            const rules = _instance.rules(req);
            const data = _instance.data(req);
            
            ValidatorProvider.factory().validate({data,rules});

            req.validated = data

            return next();
        };
    }

    static handle(){
        const _instance = new this();

        return [
            _instance.parser(),
            _instance.authorize(),
            _instance.validate()
        ];
    }

}

module.exports = {
    Request
}