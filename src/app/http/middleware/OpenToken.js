const { Log } = require('../../providers/LoggingProvider');
const { JwtService } = require('../../services/jwt/JwtService');



module.exports =  async (req,res,next)=>{
    try{
        req.token = await JwtService.decode(req.headers.authorization)
        console.log(req.token);
        req.authorized = true
        Log.Debug({heading:'Validated token'})
        next();
    } catch(err){
        req.authorized = false
        Log.Debug({heading:'Invalidated token'})
        next();
    }
}