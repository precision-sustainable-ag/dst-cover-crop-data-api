const axios = require('axios');
const { Log } = require('../../providers/LoggingProvider');
const stats_service_conf = require('../../../config/stats-service');
const { HttpClient } = require('../http/HttpClient');
const { JwtService } = require('../jwt/JwtService');

class StatsService {

    static BASE_URL = stats_service_conf.url;


    static authorization(){
        return stats_service_conf.key;
    }

    static url(uri){
        const url = this.BASE_URL;
        if(!uri) return url;

        return `${url}/${uri}`;
    }

    static async ParseBody(req){
        return new Promise((resolve, reject) => {
            let body = '';
            if (req.method === 'POST') {
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    resolve(body)
                });
            } 
            else { resolve('') }
        });
    }

    static async TrackRequest(req, service){
        const url = this.url('requests');
        const body = await this.ParseBody(req);

        const payload = {
            service,
            method: req.method,
            uri: req.url,
            clientIp: req.headers['x-forwarded-for'] ?? req.ip,
            clientUserAgent: req.headers['user-agent'] ?? 'unknown',
            contentType: req.headers['content-type'] ?? 'n/a',
            authorization: req.headers['authorization'] ?? 'n/a',
            headers: JSON.stringify(req.headers),
            params: JSON.stringify(req.query),
            body: body,
        }

        const authorization = this.authorization();

        return HttpClient.post(url,payload, {headers:{authorization}}).catch(error => {
            Log.Critical({heading:'Request Tracking Failed',message:{error:error.message, stack:error.stack, response: {
                status: error?.response?.status,
                data: error?.response?.data,
            }}});
        });
    }
}

module.exports = {
    StatsService
}