const {ModelsProvider} = require('../app/providers/ModelsProvider');
const {DatabaseProvider} = require('../app/providers/DatabaseProvider');


DatabaseProvider.sync(ModelsProvider,{force:true});