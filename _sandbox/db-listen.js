const {Client} = require('pg');
const { PostgresService } = require('../src/app/services/database/PostgresService');
const settings = require('../src/config/database');


const database = 'cover_crops';


function getClient(){
    return new Client({
        user: settings.username,
        password: settings.password,
        host: settings.host,
        database: database
    });
}

function basic(){
    const client = getClient();
    client.connect();
    // do stuff
    console.log('>>> CONNECTED',settings);
    
    client.query('LISTEN test');
    
    client.on('notification',(msg) => {
        console.log('>> MSG',msg);
    });
    
    client.query(`NOTIFY test, '!THIS IT A TEST!'`)
}

function iteration2(){
    const client = getClient();
    const client2 = getClient();

    client.connect().then(()=>{
    
        client.query('LISTEN test').then(()=>{
            client.on('notification', (msg)=>{
                console.log('>> MSG', msg);
            })
            console.log('>>> Listening ...');
        });
    
    })
    
    
    client2.connect().then(()=>{
        client2.query(`NOTIFY test, '!THIS IS A TEST!'`).then(()=>{
            console.log('notified.');
            client2.end();
        })
    })
}



async function iteration3(){
    const service = new PostgresService(settings);

    await service.listen({channel:'crop', callback:(payload)=>console.log('>> PAYLOAD',payload)});

    service.query({
        sql: `NOTIFY test, '!THIS IS A TEST!'`,
    }).execute();


}

iteration3();


