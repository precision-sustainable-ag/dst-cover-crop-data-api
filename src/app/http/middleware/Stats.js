const { StatsService } = require('../../services/stats/StatsService');
const app_conf = require('../../../config/app');

function trackRequestStats(req,res,next){
    StatsService.TrackRequest(req, app_conf.name);
    next();
}

module.exports = {
    trackRequestStats
};