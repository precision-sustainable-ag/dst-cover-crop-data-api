const { Router } = require("../../src/framework/routing/Router");

const router = Router.expose({path:'/test', routes:[


]});


console.log(router instanceof Router);


const crops = require('../../src/routes/crops');

console.log(crops instanceof Router);