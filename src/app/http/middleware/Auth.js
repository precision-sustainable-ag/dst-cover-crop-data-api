const { Log } = require('../../providers/LoggingProvider');
const { JwtService } = require('../../services/jwt/JwtService');


function ParseScopes(scopes){
    if(!scopes) return [];
    if(typeof scopes == 'string') scopes = scopes.trim().split(',');
    return scopes;

}

module.exports = (scopes) => {
    scopes = ParseScopes(scopes);

    return async (req,res,next) => {
        const authorization = req.headers.authorization;

        if(!req.token && authorization) {
            const token = await JwtService.decode(authorization);
            req.token = token;
        }

        if(!req.token) {
            req.authorized = false;
            return next();
        }

        if(scopes.length <= 0){
            req.authorized = true;
            return next();
        } 

        const tokenScopes = req?.token?.scopes;

        for(let scope of scopes){
            if(!tokenScopes.includes(scope)){
                req.authorized = false;
                return next();
            }
        }

        req.authorized = true;
        return next();

    }

}
