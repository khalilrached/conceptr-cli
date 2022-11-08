const fs            = require('fs');
const path          = require('path');
const ModelParser   = require('./ModelParser');
const logger        = require('./Logger.js');

const SCHEMA_OPTIONS = {
    URL:{
        origin:''
    }
}

class AppBuilder {
    
    #schema;
    #lang;
    #dir;
    #models
    constructor(schema,lang){
        this.#schema    = schema;
        this.#lang      = lang;
        this.#models    = new ModelParser().config(schema,lang);
        this.#dir       = path.join(process.cwd(),'models');
    }

    loadSchema(options){
        
    }

    config(schema,lang){
        this.#lang      = lang;
        this.#models    = new ModelParser().config(schema,lang);
        return this;
    }
    //schema can be json file in the working dir or on any dir or in the befast platform
    generateFiles(){
        //create models
        if(!fs.existsSync(this.#dir)){
            logger.info(`creating new folder ${this.#dir}.`);
            fs.mkdirSync(this.#dir,{
                recursive: true
            })
        }else{
            logger.info(`folder ${this.#dir} already exist.`);
        }
        this.#models.parse().forEach((model)=>{
            try{
                const newFile = path.join(this.#dir,model.name);
                fs.writeFileSync(newFile,model.code);
                logger.info(`${newFile} created.`)
            } catch(e){
                logger.error(e);
            }
        })
    }

}

module.exports = AppBuilder;