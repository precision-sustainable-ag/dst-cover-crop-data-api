
import dotenv from 'dotenv'
import { app_path } from '../app/support/helpers/path.js';

export const env = dotenv.config({path:app_path('.env')})?.parsed;

export default env;