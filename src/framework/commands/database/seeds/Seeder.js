const { Log } = require("../../../../app/providers/LoggingProvider");
const { AccessTokensScopesSeed } = require("./AccessTokensScopesSeed");
const { AccessTokensSeed } = require("./AccessTokensSeed");
const { ScopesSeed } = require("./ScopesSeed");


const Seeds = [
    ScopesSeed,
    // AccessTokensSeed, //going to run this one separately.
    AccessTokensScopesSeed
];

module.exports = class Seeder {

    static async sow(){
        const data = await AccessTokensSeed.plant();
        const token = data[0];

        for(let seed of Seeds){
    
            const data = await seed.plant();
    
        }

        Log.Info({message:token,heading:'Master Token Created:'})
        return token;
    }
}
