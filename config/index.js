import * as rethink from './rethinkdb.js'
import * as app from './app.js'

let environment = process.env.NODE_ENV || 'development'
const __IS_PRODUCTION__ = environment==='production'
const __IS_TESTING__ = environment==='testing'
let   __IS_DEVELOPMENT__ = environment==='development'

let appConfig = {}
let dbConfig = {}
if(__IS_PRODUCTION__) {
    appConfig = app.production
    dbConfig = rethink.production

}else if(__IS_TESTING__){
    appConfig = app.test
    dbConfig = rethink.test

}else if(__IS_DEVELOPMENT__){
    appConfig = app.development
    dbConfig = rethink.development

}else{
    console.log("Ningun ambiente de desarrollo especificado, cargando 'development' por defecto.")
    environment = 'development'
    __IS_DEVELOPMENT__ = true
}

console.log(`Health Server ${appConfig.version}`);
console.log(`Configuración '${environment}' cargada.`)

export {
    appConfig,
    dbConfig,
    __IS_PRODUCTION__,
    __IS_TESTING__,
    __IS_DEVELOPMENT__
}