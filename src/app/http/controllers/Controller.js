

export class Controller {

    static factory(){
        const _instance = new this();

        for ( let propName of Object.getOwnPropertyNames(this.prototype)) {

            if(propName != 'constructor') {
                const prop = _instance[propName];
                _instance[propName] = Controller.wrap(prop)
            }
        }

        return _instance;
    }

    static wrap(method){

        return async (req, res, next) => {

            const _return = method(req)

            return res.send(_return);

        }
    }

}