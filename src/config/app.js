import {env} from './kernel.js'

export default {
    name: env.APP_NAME,
    port: env.APP_PORT,
}