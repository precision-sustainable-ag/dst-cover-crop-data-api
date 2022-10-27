
const Queue = require("bull");
const redis_conf = require('../src/config/redis');


async function iteration1(){
    try{
        const queue = new Queue('my-first-queue',{ 
            redis: { 
                port: redis_conf.port, 
                host: redis_conf.host, 
                password: redis_conf.password,
                maxRetriesPerRequest: 1,
            },
        });
        
        // const main = async () => {
        //     await queue.add({ name: "John", age: 30 }).catch(err => console.log('add',err));
        // };
        
        queue.process((job, done) => {
            try {
                console.log(job.data);
                done();
            } catch(err){ console.log('inner err',err)}
        }).catch(err => console.log('caught',err))
        // main().catch(console.error);
    } catch(err){
        console.log('error',err);
    }

    

}

iteration1();