
// const express = require('express')
// const { bootstrap } = require('./bootstrap')
const app_conf = require('./config/app')
const { Log } = require('./app/providers/LoggingProvider')

const { AppProvider } = require("./app/providers/AppProvider");


AppProvider.factory().then(app => {
    if(app) app.listen(app_conf.port, () => {
        Log.Info({message:`${app_conf.name} listening on port ${app_conf.port}`, heading: 'Application Instantiated:'})
    });
})

// module.exports = async function main(){

//     const app = express()

//     const bootstrapped = await bootstrap(app);
    
    
//     if(!bootstrapped){
//         Log.Critical({message:`Failed to instantiate ${app_conf.name}.`, heading:'Bootstrapping Failed.'})
//         return null;
//     } 

//     return app;
// }

// main()

