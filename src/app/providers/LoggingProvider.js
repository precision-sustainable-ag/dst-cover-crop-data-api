import log_conf from '../../config/logging.js'
import { DEBUG, INFO, WARNING, CRITICAL, Logger } from '../support/logging/Logger.js'
import { SingleLogger } from '../support/logging/SingleLogger.js';
import { DailyLogger } from '../support/logging/DailyLogger.js';
import { SlackLogger } from '../support/logging/SlackLogger.js';
import Provider from './Provider.js';

export default class LoggingProvider extends Provider {

    static async register(){

        const channel = log_conf.channel;

        if(channel == STACK){
    
            const stack = log_conf.stack;
    
            for(let key of stack){

                const logger = LOGGERS[key] ?? null;

                if(logger)
                    CHANNELS.push(new logger())
            }
    
            if(CHANNELS.length <= 0){
                CHANNELS.push(new LOGGERS['console'])
            }
    
        } else {
            const logger = LOGGERS[channel] ?? LOGGERS['console'];
            CHANNELS.push(new logger())
        }
    
        return CHANNELS.length > 0;

    }

    static factory(){
        return Log;
    }

}

export const STACK = 'stack';

export const LOGGERS = {
    'console': Logger,
    'single': SingleLogger,
    'daily': DailyLogger,
    'slack': SlackLogger
}

export const CHANNELS = []

export class Log {

    static Debug({message,heading}){
        const level = DEBUG;
        Log.log({message, heading, level});
    }

    static Info({message,heading}){
        const level = INFO;
        Log.log({message, heading, level});
    }

    static Warning({message,heading}){
        const level = WARNING;
        Log.log({message, heading, level});
    }

    static Critical({message,heading}){
        const level = CRITICAL;
        Log.log({message, heading, level});
    }

    static log({message, heading, level}){

        if (CHANNELS.length <= 0) {  
            const logger = new LOGGERS['console']();
            logger.log({message,heading,level});
            return false;
        }

        for(let channel of CHANNELS){
            channel.log({message, heading, level})
        }

        return true;

    }

}