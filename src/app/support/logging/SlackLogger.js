import { IncomingWebhook } from '@slack/webhook';
import log_conf from '../../../config/logging.js'
import { Logger } from './Logger.js';

const WebHookURL = log_conf.slack.webhook;
const WebHook = new IncomingWebhook(WebHookURL);

export class SlackLogger extends Logger {
    
    configKey(){
        return 'slack';
    }

    write(stmnt, level){
        return WebHook.send({
            icon_emoji: level.slack.emoji,
            username: `${stmnt.heading} [${stmnt.time}]`,
            attachments: [{
                fallback: stmnt.flat,
                title: stmnt.level,
                text: stmnt.message,
                color: level.slack.color
            }]
        });
    }

}