const LANGUAGE  = require('./Language');
const Formatter = require('./Formatter'); 
const logger = require('./Logger');

const REQUIRED_KEYS_METHOD      = ['name','returnType','scope'];

const REQUIRED_KEYS_METHOD_ARGS = ['name','returnType','scope'];

const REQUIRED_KEYS_ATTRIBUTE   = ['name','type','scope'];

const CHECK_KEYS = (KEYS = [],REQUIRED_KEYS = []) => {
    return REQUIRED_KEYS.map((key) => KEYS.includes(key)).reduce((acc,v)=> acc &= v ,true);
}

class ModelParser{
    
    #LANG   = 'JAVA_SCRIPT';
    #SCHEMA ;
    
    config( schema, lang = "JAVA_SCRIPT" ){
        if(!Object.keys(LANGUAGE).includes(lang)) throw new Error(`${lang} it might be misspelled or it's not supported.\nuse --help to see all supported language.`)
        // if(!Object.keys(config.schema).includes(lang)) throw new Error(`${lang} it might be misspelled or it's not supported.\nuse --help to see all supported language.`) 
        this.#LANG      = lang;
        this.#SCHEMA    = schema;
        return this;
    }
    
    parse(){
        return this.#SCHEMA.map((model)=>({
            name:model.name+LANGUAGE[this.#LANG].ext,
            code:Formatter.ClassFormat[this.#LANG]
                .replace(/{name}/,model.name)
                .replace(/{attributes}/,this.#parseAttribute(model))
                .replace(/{methods}/,this.#parseMethod(model))
        }))
    }
    
    #parseAttribute(model){
        if(!Object.keys(model).includes('attributes')){
            logger.warn(`${model.name} does not have attribues!`);
            return '';
        } 
        return model.attributes.map((attribute)=>{
            //chek for available keys
            if(!CHECK_KEYS(Object.keys(attribute),REQUIRED_KEYS_ATTRIBUTE)){
                throw new Error(`one of the attribute does not match the schema.`)
            }
            return Formatter.AttributeFormat[this.#LANG]
                .replace(/{name}/,attribute.name)
                .replace(/{type}/,attribute.type)
                .replace(/{scope}/,attribute.scope);
        }).reduce((acc,item)=> acc += item,'');
    }

    #parseArg(method){
        if(!Object.keys(method).includes('args')){
            return '';
        }
        return method.args.map((arg) => {
            //chek for available keys
            if(!CHECK_KEYS(Object.keys(arg),REQUIRED_KEYS_METHOD_ARGS)){
                throw new Error(`one of the method args does not match the schema.`)
            }
            return Formatter.ArgFormat[this.#LANG]
            .replace(/{name}/,arg.name)
            .replace(/{type}/,arg.type);
        }).reduce((acc,item) => acc += item + ', ' ,' ').slice(0,-2);
    }
    
    #parseMethod(model){
        if(!Object.keys(model).includes('methods')){
            logger.warn(`${model.name} does not have methods!`);
            return '';
        }
        return model.methods.map((method)=>{
            //chek for available keys
            if(!CHECK_KEYS(Object.keys(method),REQUIRED_KEYS_METHOD)){
                throw new Error(`one of the methods does not match the schema.`)
            }
            return Formatter.MethodFormat[this.#LANG]
                .replace(/{name}/,method.name)
                .replace(/{r_type}/,method.returnType)
                .replace(/{scope}/,method.scope)
                .replace(/{args}/,this.#parseArg(method))
                .replace(/{desc}/,method.desc)
        }).reduce((acc,item)=>acc += item,'');
    }
    
    #parseRelation(){ throw new Error('parseRelation is not implemented yet'); }
    
}

module.exports = ModelParser;