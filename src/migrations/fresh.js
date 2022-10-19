const {ModelsProvider} = require('../app/providers/ModelsProvider');
const {DatabaseProvider} = require('../app/providers/DatabaseProvider');

const settings = DatabaseProvider.settings();

DatabaseProvider.Service()
    .createDatabaseIfNotExists(settings.database)
    .execute()
    .then(() => {
        DatabaseProvider.sync(ModelsProvider,{force:true})
    });

// DatabaseProvider.CreateDatabaseIfNotExists().then(exists => {
//     if(!exists) throw Error('Database does not exist.');
//     DatabaseProvider.CloseClient();
//     DatabaseProvider.sync(ModelsProvider,{force:true});
// });

