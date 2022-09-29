
import { ForbiddenAccess } from '../../exceptions/ForbiddenAccess.js'

export default (req,res,next)=>{
    throw new ForbiddenAccess();
}