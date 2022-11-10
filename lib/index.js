const fs = require('fs');
const AppBuilder = require('./AppBuilder');
const ModelParser = require('./ModelParser');

const handlers = {
    generate:(argv)=>{
        const test_models = new ModelParser();

        const ab = new AppBuilder(argv.lang);

        ab.loadSchema({url:argv.output,method:'WITH_LOCAL_FILE'}).generateFiles()
    }
}

module.exports = handlers; 