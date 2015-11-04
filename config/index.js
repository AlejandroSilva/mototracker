import {
    environment,
    __IS_PRODUCTION__,
    __IS_TESTING__,
    __IS_DEVELOPMENT__,
} from '../utils/environment'
import * as rethink from './rethinkdb.js'
import * as app from './app.js'

let appConfig = {}
let dbConfig = {}
if(__IS_PRODUCTION__) {
    appConfig = app.production
    dbConfig = rethink.production
}else if(__IS_TESTING__){
    appConfig = app.testing
    dbConfig = rethink.test
}else if(__IS_DEVELOPMENT__){
    appConfig = app.development
    dbConfig = rethink.development
}else{
    new Error("Ningun ambiente de desarrollo especificado")
}

console.log(`Health Server ${appConfig.version}`);
console.log(`Configuración '${environment}' cargada.`)

export {
    appConfig,
    dbConfig
}