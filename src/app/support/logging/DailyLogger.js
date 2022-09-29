import fs from 'fs'
import { app_path } from '../helpers/path.js';
import { Logger } from './Logger.js';
import {DateTime} from 'luxon'

export class DailyLogger extends Logger {

    configKey(){
        return 'daily';
    }

    write(stmnt){
        const time = DateTime.now();
        fs.appendFile(
            app_path(`storage/logs/express-${time.day}-${time.month}-${time.year}.log`),
            stmnt.flat,
            (error)=>{
                if(error) console.log(error)
        });
    }

}