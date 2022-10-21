const express = require('express');
const BodyParser = require('body-parser');
const dotenv = require('dotenv');

const env = dotenv.config()?.parsed;

const PORT = env.APP_PORT ?? 3002;
const NAME = env.APP_NAME ?? 'Example Broadcast Client';

const app = express();

app.use(BodyParser.json());

app.get('/',(req,res,next)=>{
    res.send(200);
})

app.post('/observe/cover-crops', (req, res, next)=>{
    console.log('\x1b[93m',`>>> Client API: ${NAME}`);
    console.log('\x1b[92m','Observed Cover Crops Broadcast:','\x1b[0m');
    console.log(JSON.stringify(req.body,null,'\t'));
    res.send(req.body);
})

app.listen(PORT, () => {
    console.log('\x1b[92m',`${NAME} listening on port ${PORT}`);
})