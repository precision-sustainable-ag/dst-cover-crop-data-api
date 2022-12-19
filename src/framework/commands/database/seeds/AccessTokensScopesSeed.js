const { AccessTokensScope } = require('../../../../app/models/AccessTokensScope');
const { AccessToken } = require('../../../../app/models/AccessToken');
const { Scope } = require('../../../../app/models/Scope');
const Seed = require('./Seed');

class AccessTokensScopesSeed extends Seed {

    static model(){
        return AccessTokensScope;
    }
    
    static async data(){
        const token = await AccessToken.findOne({label:'Master Token'});
        const scopes = await Scope.findAll();
    
        const tokensScopes = [];
        for(let scope of scopes){

            tokensScopes.push({
                accessTokenId: token.id,
                scopeId: scope.id
            })

        }
        return tokensScopes;

    }

}

module.exports = {
    AccessTokensScopesSeed
}