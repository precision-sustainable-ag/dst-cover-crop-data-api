const AccessToken = require('../app/models/AccessToken');
const AccessTokensScope = require('../app/models/AccessTokensScope');
const Scope = require('../app/models/Scope');
const { Log } = require('../app/providers/LoggingProvider');



AccessToken
Scope
AccessTokensScope

AccessToken.register();
Scope.register();
AccessTokensScope.register();

AccessToken.registerRelations();
Scope.registerRelations();
AccessTokensScope.registerRelations();


// const record = await AccessToken.findOne({where:{id:1}},{include:[AccessTokensScope]})
const record = await AccessTokensScope.findOne({where:{id:1}, include: [AccessToken, Scope]})
// console.log(atc);
Log.Debug({
    message: record,
    heading:'Found Record'
})