import {env} from './kernel.js'

export default {
    channel: env.LOG_CHANNEL,
    stack: ['daily','slack'],
    console: {
        level: 'debug',
    },
    single: {
        level: 'critical',
    },
    daily: {
        level: 'critical',
    },
    slack: {
        webhook: env.SLACK_WEBHOOK_URL,
        level: 'critical',
        debug: {
            emoji: ':female_zombie:',
            color: '#FFD700'
        },
        info: {
            emoji: ':thought_balloon:',
            color: '#E6E6FA'
        },
        warning: {
            emoji: ':eyes:',
            color: '#FF8C00'
        },
        critical: {
            emoji: ':boom:',
            color: '#DC143C'
        },
    },
}