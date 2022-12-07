const { HttpClient } = require("./HttpClient");


class StatsService {

    // TODO: Make this a config file variable.
    // https://stats.covercrop-data.org/
    // https://developstats.covercrop-data.org/
    static BASE_URL = "https://stats.covercrop-data.org/"

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
                    console.log('pre-Body',body)
                    resolve(body)
                });
            } 
            else { resolve('') }
        });
    }

    static async TrackRequest(req, service){
        // console.log('track ....',req.url);
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
        
        // console.log('>>> TRACKING REQUEST: ',payload);
        return HttpClient.Post(url,payload).catch(err => {
            console.log('failed.',err.response.data)
        });
    }


}

module.exports = {
    StatsService
}