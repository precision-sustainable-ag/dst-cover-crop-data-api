const {ModelsProvider} = require('../app/providers/ModelsProvider');
const {DatabaseProvider} = require('../app/providers/DatabaseProvider');


DatabaseProvider.CreateDatabaseIfNotExists().then(exists => {
    if(!exists) throw Error('Database does not exist.');
    DatabaseProvider.CloseClient();
    DatabaseProvider.sync(ModelsProvider,{force:true});
});

