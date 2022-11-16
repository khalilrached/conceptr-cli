const fs = require('fs');
const AppBuilder = require('./AppBuilder');
const ModelParser = require('./ModelParser');

const handlers = {
    generate:(argv)=>{
        const ab = new AppBuilder(argv.lang);
        //ab.loadSchema({url:argv.output,method:'WITH_LOCAL_FILE'}).generateFiles()
        ab.loadLocalSchema({outpath:argv.output}).generateFiles();
    }
}

module.exports = handlers; 