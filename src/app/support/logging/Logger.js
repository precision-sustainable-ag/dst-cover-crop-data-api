import {DateTime} from 'luxon'
import log_conf from '../../../config/logging.js'

export const DEBUG = {
    order: 1,
    label: 'DEBUG',
    slack: log_conf.slack.debug
};

export const INFO = {
    order: 2,
    label: 'INFO',
    slack: log_conf.slack.info
};

export const WARNING = {
    order: 3,
    label: 'WARNING',
    slack: log_conf.slack.warning
};

export const CRITICAL = {
    order: 4,
    label: 'CRITICAL',
    slack: log_conf.slack.critical
};

export const LOG_LEVELS = {
    info:INFO, debug:DEBUG, warning:WARNING, critical:CRITICAL
};



export class Logger {

    configKey(){
        return 'console';
    }

    logLevel(){
        const conf = log_conf[this.configKey()]
        return LOG_LEVELS[conf?.level] ?? INFO;
    }

    log({message, heading, level}){
        const LOG_LEVEL = this.logLevel();

        if(typeof message == 'object') message = JSON.stringify(message, null, "\t");
        if(!level) level = INFO;
        if(!heading) heading = '';

        const time = DateTime.now();
        // const stmnt = ;
        const stmnt = {
            level: level.label,
            time,
            heading,
            message,
            flat: `[${level.label}\t| ${time}] ${heading}\n${message}\n`
        }

        if(level.order >= LOG_LEVEL.order){
            this.write(stmnt, level);
        }

    }

    write(stmnt){
        console.log(stmnt.flat);
    }

}