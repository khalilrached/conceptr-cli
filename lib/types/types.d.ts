export interface ConceptrAttribute{
    name:string,
    type:string | 'String' | 'Date' | 'int' | 'integer' | 'float' | 'double' | 'bool' | 'boolean',
    scope: 'private' | 'public' | 'protected' 
}
export interface ConceptrMethodArg{
    name:string,
    type:string | 'String' | 'Date' | 'int' | 'integer' | 'float' | 'double' | 'bool' | 'boolean',
}
export interface ConceptrMethod{
    name:string,
    returnType:string | 'String' | 'Date' | 'int' | 'integer' | 'float' | 'double' | 'bool' | 'boolean' | 'void',
    args:ConceptrMethodArg[] | [],
    desc:string | null,
    scope: 'private' | 'public' | 'protected' 
}
export interface ConceptrRelation{
    type:string,
    to:string
} 
export interface ConceptrModel {
    name:string,
    attributes:ConceptrAttribute[] | [],
    methods:ConceptrMethod[] | [],
    relation:ConceptrRelation[] | [],
}
export interface ConceptrSchema {
    models:ConceptrModel[] | []
}