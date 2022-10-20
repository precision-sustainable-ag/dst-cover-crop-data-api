
const Queue = require("bull");
const redis_conf = require('../src/config/redis');


function iteration1(){

    const queue = new Queue('my-first-queue',{ 
        redis: { 
            port: redis_conf.port, 
            host: redis_conf.host, 
            password: redis_conf.password 
        } 
    });
    

    const main = async () => {
        await queue.add({ name: "John", age: 30 });
    };
    
    queue.process((job, done) => {
        console.log(job.data);
        done();
    });
    
    main().catch(console.error);

}

iteration1();