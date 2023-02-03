const axios = require('axios');



class HttpClient {


    static post(url, data, config){

        return axios.post(url, data, config);

    }
    
}

module.exports = {
    HttpClient
}