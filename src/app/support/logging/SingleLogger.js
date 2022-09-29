import fs from 'fs'
import { app_path } from '../helpers/path.js';
import { Logger, LOG_LEVELS } from './Logger.js';

export class SingleLogger extends Logger{
    
    configKey(){
        return 'single';
    }

    write(stmnt){
        fs.appendFile(
            app_path('storage/logs/express.log'),
            stmnt.flat, 
            (error)=>{
                if(error) console.log(error)
        });
    }

}