
import express from 'express'
import bootstrap from './bootstrap.js'
import app_conf from './config/app.js'
import log_conf from './config/logging.js'
import { Log } from './app/providers/LoggingProvider.js'
import Post from './app/models/Post.js'
import Model from './app/models/Model.js'



const app = express()

const bootstrapped = await bootstrap(app);


if(bootstrapped){
    
    app.listen(app_conf.port, () => {
        Log.Info({message:`${app_conf.name} listening on port ${app_conf.port}`, heading: 'Application Instantiated:'})
    })

} else {
    Log.Critical({message:`Failed to instantiate ${app_conf.name}.`, heading:'Bootstrapping Failed.'})
}


