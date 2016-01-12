let config
if(WEBPACK_IS_DEVELOPMENT){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_dev'
    }

}else if(WEBPACK_IS_PRODUCTION){
        config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator'
    }

}else if(WEBPACK_IS_TESTING){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_test'
    }

}else {
    throw new Error("[config/rehitnkdb.js] NO environment selected")
}

export const dbConfig = config