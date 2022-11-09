const fs = require('fs');

const handlers = {
    generate:(argv)=>{
        fs.writeFileSync('.conceptr.json',JSON.stringify(model_type))

        const test_models = new mp();

        const ab = new AppBuilder('JAVA');

        ab.loadSchema({url:'',method:'WITH_LOCAL_FILE'}).generateFiles()
    }
}

module.exports = handlers; 