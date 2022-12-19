
const { AccessToken } = require('../../../../app/models/AccessToken');
const Seed = require('./Seed');



class AccessTokensSeed extends Seed {

    static model(){
        return AccessToken;
    }
    
    static async data(){
        return [
            {
                label:'Master Token',
                key: AccessToken.GenerateKey(),
                secret: AccessToken.GenerateSecret(), 
                description:'This grants the authority to manage access tokens & scopes as well as all other scopes present during seeding process.'
            },
        ];
    }


}

module.exports = {
    AccessTokensSeed
}