
import { RenderableException } from '../../exceptions/RenderableException.js'
import { InternalServerError } from '../../exceptions/InternalServerError.js'
import { Log } from '../../providers/LoggingProvider.js';


export default (err, req, res, next) => {

    if (err instanceof RenderableException && !err instanceof InternalServerError){
        return err.render(res);
    }

    Log.Critical({message:err, heading:'Critical Failure!'});
    let error = err;
    if(!error instanceof InternalServerError) error =  new InternalServerError();

    return error.render(res);

}