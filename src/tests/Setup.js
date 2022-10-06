
// const {ModelsProvider} = require('../app/providers/ModelsProvider');
// const {DatabaseProvider} = require('../app/providers/DatabaseProvider');
// const {LoggingProvider} = require('../app/providers/LoggingProvider');
// const Seeder = require('../migrations/seeds/Seeder');

// async function InitDatabase(){
//     await DatabaseProvider.register();
//     await ModelsProvider.register();
// }

// async function InitLogger(){
//     await LoggingProvider.register();
// }

module.exports = async () => {
    await InitLogger();
    await InitDatabase();
}



