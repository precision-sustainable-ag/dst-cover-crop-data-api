
const { Scope } = require('../../../../app/models/Scope');
const Seed = require('./Seed');


class ScopesSeed extends Seed {

    static model(){
        return Scope;
    }
    
    static async data(){

        return [
            {label:'Create Keys',key:'keys_create', description:'This grants the authority to generate RSA encryption keys.'},
            {label:'Read Keys',key:'keys_read', description:'This grants the authority to read RSA encryption keys.'},
            {label:'Create Access Tokens',key:'access_token_create', description:'This grants the authority to create access tokens.'},
            {label:'Read Access Tokens',key:'access_token_read', description:'This grants the authority to read access tokens.'},
            {label:'Update Access Tokens',key:'access_token_update', description:'This grants the authority to update access tokens.'},
            {label:'Delete Access Tokens',key:'access_token_delete', description:'This grants the authority to delete access tokens.'},
            {label:'Create Scopes',key:'scope_create', description:'This grants the authority to create access tokens.'},
            {label:'Read Scopes',key:'scope_read', description:'This grants the authority to read access tokens.'},
            {label:'Update Scopes',key:'scope_update', description:'This grants the authority to update access tokens.'},
            {label:'Delete Scopes',key:'scope_delete', description:'This grants the authority to delete access tokens.'},
            {label:'Create Data',key:'data_create', description:'This grants the authority to create data across all services.'},
            {label:'Read Data',key:'data_read', description:'This grants the authority to read data across all services.'},
            {label:'Update Data',key:'data_update', description:'This grants the authority to update data across all services.'},
            {label:'Delete Data',key:'data_delete', description:'This grants the authority to delete data across all services.'},
        ];

    }

}

module.exports = {
    ScopesSeed
}