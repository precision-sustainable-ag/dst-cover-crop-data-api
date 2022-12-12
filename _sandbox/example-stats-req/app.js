const express = require('express');
const { StatsService } = require('./StatsService');

const app = express();

// essentially middleware needed
function track(req,res,next){
    StatsService.TrackRequest(req,'test-service').then(res => console.log('response',res));
    next();
}

app.use('/', track, (req,res,next)=>{
    res.send('handled reqs');
})


app.listen(3011,()=>{console.log('server listening ...')})