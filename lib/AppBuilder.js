const fs            = require('fs');
const path          = require('path');
const ModelParser   = require('./ModelParser');
const logger        = require('./Logger.js');

const SCHEMA_OPTIONS = {
    WITH_URL:0,
    WITH_LOCAL_FILE:1,
}

class AppBuilder {
    
    #schema;
    #lang;
    #dir;
    #models
    constructor(lang){
        this.#lang      = lang;
        this.#dir       = path.join(process.cwd(),'models');
    }
    /**
     * @deprecated
     */
    loadSchema(options = {url:'',method:'WITH_URL'}){
        if(!Object.keys(SCHEMA_OPTIONS).includes(options.method)){
            logger.error(`unknown option ${options.method} !`);
            throw new Error('unknown option for loading the schema.');
        }
        switch (SCHEMA_OPTIONS[options.method]){
            //download the file from befast platform
            case SCHEMA_OPTIONS.WITH_URL:
                throw new Error('not implemented !');
            //open the file localy
            case SCHEMA_OPTIONS.WITH_LOCAL_FILE:
                if(options.url === ''){
                    const filePath = path.join(process.cwd(),'.conceptr.json')
                    try{
                        const data = fs.readFileSync(filePath,'utf-8');
                        this.#schema = JSON.parse(data);
                        logger.info('schema loaded');
                    } catch(e) {
                        logger.error("there's no '.conceptr.json' file in this directory");
                        throw new Error('.conceptr.json File not found!');
                    }
                }else{
                    var filePath = path.join(options.url,'.conceptr.json');
                    try{
                        const data = fs.readFileSync(filePath,'utf-8');
                        this.#schema = JSON.parse(data);
                        logger.info('schema loaded');
                    } catch(e) {
                        throw new Error('.conceptr.json File not found!');
                    }
                }
                break;
        }
        this.#models    = new ModelParser().config(this.#schema,this.#lang);
        return this;
    }

    /**
    *   load the local schema locally from a given folder path throw error if '.conceptr.json' does not exist
    *   generate the files in the output folder
    *   default output folder is the @folder_path + ./models/*
    */
    loadLocalSchema(options = {outpath: ''}){
        const folder_path       = process.cwd();
        const out_folder_path   = (options.outpath.length === 0)?path.join(process.cwd(),'models'):options.outpath;
        const files = fs.readdirSync(folder_path);
        if(!files.includes('.conceptr.json')) throw new Error(`${folder_path} does not contains '.conceptr.json' .`);
        //read the file
        const file_path = path.join(folder_path,'.conceptr.json')
        var data;
        try{
            data      = JSON.parse(fs.readFileSync(file_path,'utf-8'));
        }catch(e){
            throw new Error("Error occured while reading .conceptr.json check if file obey to the schema"); 
        }
        //check file schema if it's match the schema
        //parse the data
        this.#schema    = data;
        this.#models    = new ModelParser().config(this.#schema,this.#lang);
        return this;
    }

    config(schema,lang){
        this.#lang      = lang;
        this.#models    = new ModelParser().config(this.#schema,this.#lang);
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