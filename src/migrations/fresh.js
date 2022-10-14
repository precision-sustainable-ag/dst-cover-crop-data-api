const {ModelsProvider} = require('../app/providers/ModelsProvider');
const {DatabaseProvider} = require('../app/providers/DatabaseProvider');
const {Client} = require('pg');

const settings = DatabaseProvider.settings();

const pgClient = new Client({
    user: settings.username,
    password: settings.password,
    host: settings.host,
    database: 'postgres'
});

const CreateDatabaseIfNotExists = "SELECT 'CREATE DATABASE cover_crops' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cover_crops')"

pgClient.connect();

pgClient.query(CreateDatabaseIfNotExists, (err, res) => {
    if(res){
        console.log('response',res);
        DatabaseProvider.sync(ModelsProvider,{force:true});
    }
    pgClient.end();
})

