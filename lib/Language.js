const Language = {
    JAVA_SCRIPT:{
        ext:'.js',
        package_manager:['npm','yarn']
    },
    TYPE_SCRIPT:{
        ext:'.ts',
        package_manager:['npm','yarn']
    },
    JAVA:{
        ext:'.java',
        package_manager:['maven','gradle']
    },
    C_SHARP:{
        ext:'.cs',
        package_manager:['nuget']
    },
    //CPP:4,
    PYTHON:{
        ext:'.py',
        package_manager:['pip']
    }
}

module.exports = Language;
