const axios = require('axios');



class HttpClient {


    static Post(url, data){

        return axios.post(url, data);

    }
    
}

module.exports = {
    HttpClient
}