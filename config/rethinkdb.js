//import { environment } from './environment.js'
const NODE_ENV = process.env.NODE_ENV

let config
if(NODE_ENV==='development' || WEBPACK_IS_DEVELOPMENT){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_dev'
    }

}else if(NODE_ENV==='production' || WEBPACK_IS_PRODUCTION){
        config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator'
    }

}else if(NODE_ENV==='testing' || WEBPACK_IS_TESTING){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_test'
    }

}else {
    console.log(process.env)
    throw new Error("[config/rehitnkdb.js] NO environment selected")
}

export const dbConfig = config