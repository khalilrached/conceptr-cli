const LANGUAGE = require('./Language');
const Formatter = require('./Formatter'); 
const model_type = [{
    name:'User',
    attributes:[
        {
            name:'name',
            type:'String',
            scope:'public'
        }
    ],
    methods:[
        {
            name:'setName',
            returnType:'void',
            args:[
                {
                    name:'name',
                    type:'String'
                }
            ],
            desc:'set the name of the user',
            scope:'public'
        },
        {
            name:'getName',
            returnType:'String',
            args:[],
            desc:'get the name of the user',
            scope:'public'
        }
    ],
    relations:[]
},{
    name:'Client',
    attributes:[
        {
            name:'name',
            type:'String',
            scope:'public'
        }
    ],
    methods:[
        {
            name:'setName',
            returnType:'void',
            args:[
                {
                    name:'name',
                    type:'String'
                }
            ],
            desc:'set the name of the user',
            scope:'public'
        },
        {
            name:'getName',
            returnType:'String',
            args:[],
            desc:'get the name of the user',
            scope:'public'
        }
    ],
    relations:[]
}]

class ModelParser{
    
    #LANG = 'JAVA_SCRIPT';
    #SCHEMA = model_type;
    
    config( schema = model_type, lang = "JAVA_SCRIPT" ){
        if(!Object.keys(LANGUAGE).includes(lang)) throw new Error(`${lang} it might be misspelled or it's not supported.\nuse --help to see all supported language.`)
        // if(!Object.keys(config.schema).includes(lang)) throw new Error(`${lang} it might be misspelled or it's not supported.\nuse --help to see all supported language.`) 
        this.#LANG = lang;
        this.#SCHEMA = schema;
        return this;
    }
    
    parse(){
        return this.#SCHEMA.map((model)=>{
            return Formatter.ClassFormat[this.#LANG]
                    .replace(/{name}/,model.name)
                    .replace(/{attributes}/,this.#parseAttribute(model.attributes))
                    .replace(/{methods}/,this.#parseMethod(model.methods));
        })
    }
    
    #parseAttribute(attributes = this.#SCHEMA[0].attributes){
        return attributes.map((attribute)=>{
            return Formatter.AttributeFormat[this.#LANG]
            .replace(/{name}/,attribute.name)
            .replace(/{type}/,attribute.type)
            .replace(/{scope}/,attribute.scope);
        }).reduce((acc,item)=> acc += item,'');
    }

    #parseArg(methodArgs = this.#SCHEMA[0].methods[0].args){
        const padding = (methodArgs != 0)?' ':'';
        return methodArgs.map((arg) => {
            return Formatter.ArgFormat[this.#LANG]
            .replace(/{name}/,arg.name)
            .replace(/{type}/,arg.type);
        }).reduce((acc,item) => acc += item + ', ' ,' ').slice(0,-2) + padding;
    }
    
    #parseMethod(methods = this.#SCHEMA[0].methods){
        return methods.map((method)=>{
            return Formatter.MethodFormat[this.#LANG]
                    .replace(/{name}/,method.name)
                    .replace(/{r_type}/,method.returnType)
                    .replace(/{scope}/,method.scope)
                    .replace(/{args}/,this.#parseArg(method.args))
                    .replace(/{desc}/,method.desc)
        }).reduce((acc,item)=>acc += item,'');
    }
    
    #parseRelation(){}
    
}

module.exports = ModelParser;