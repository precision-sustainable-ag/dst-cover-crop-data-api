const bodyParser = require("body-parser");
const { Request } = require("./Request");


class PostRequest extends Request {
    

    parser(){
        return bodyParser.json();
    }

    path(){
        return {

        }
    }

    query(){
        return {

        }
    }

    json(){
        return {
            question: {
                type: "string",
                required: true
            },
            answers: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        }
    }


}

module.exports = { PostRequest }