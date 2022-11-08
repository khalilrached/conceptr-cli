const ScopeFormat = {
    JAVA_SCRIPT:{
        PUBLIC:'',
        PRIVATE:'#'
    },
    TYPE_SCRIPT:{
        PUBLIC:'',
        PRIVATE:'#'
    },
    JAVA:{
        PUBLIC:'public',
        PRIVATE:'private',
        PROTECTED:'protected'
    },
    C_SHARP:{
        PUBLIC:'public',
        PRIVATE:'private',
        PROTECTED:'protected'
    },
    PYTHON:{
        PUBLIC:'',
        PRIVATE:'__'
    }
}

const AttributeFormat = {    
    JAVA_SCRIPT: "\t{name}\n",
    TYPE_SCRIPT: "\t{name}:{type}\n",
    PYTHON: "\t{name}:{type}\n",
    JAVA: "\t{scope} {type} {name};\n",
    C_SHARP: "\t{scope} {type} {name};\n",
}

const ArgFormat = {
    /** ( arg, arg.. )  */
    JAVA_SCRIPT: "{name}",
    /** ( arg:type, arg:type... )  */
    TYPE_SCRIPT: "{name}:{type}",
    /** ( arg:type, arg:type... )  */
    PYTHON: "{name}:{type}",
    /** ( type arg, type... arg... )  */
    JAVA: "{type} {name}",
    /** ( type arg, type... arg... )  */
    C_SHARP: "{type} {name}",
}

const MethodFormat = {
    /** methodName(args){ body } */
    JAVA_SCRIPT: "\t{name}({args}) {\n\t\t/*{desc}*/\n\t}\n",
    /** ('#'|'')methodName(args):return_type { body } */
    TYPE_SCRIPT: "\t{scope}{name}({args}):{r_type} {\n\t\t/*{desc}*/\n\t}\n",
    /** ('__'|'')methodName(args) -> return_type { body } */
    PYTHON: "\t{scope}{name}({args}) -> {r_type}:\n\t\t#{desc}\n\t\tpass\n",
    /** scope return_type methodName(args) -> return_type { body } */
    JAVA: "\t{scope} {r_type} {name}({args}) {\n\t\t/*{desc}*/\n\t}\n",
    /** scope return_type methodName(args) -> return_type { body } */
    C_SHARP: "\t{scope} {r_type} {name}({args}) {\n\t\t/*{desc}*/\n\t}\n",
}


const ClassFormat = {
    JAVA_SCRIPT: "class {name} {\n\n{attributes}\n{methods}}",
    TYPE_SCRIPT: "class {name} {\n\n{attributes}\n{methods}}",
    PYTHON: "class {name}:\n\n{attributes}\n{methods}",
    JAVA: "public class {name} {\n\n{attributes}\n{methods}}",
    C_SHARP: "public class {name} {\n\n{attributes}\n{methods}}",
}


const Formatter = {ScopeFormat,MethodFormat,ArgFormat,ClassFormat,AttributeFormat};

module.exports = Formatter;