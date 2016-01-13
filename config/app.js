let packagejson = require("../package.json")
//import { environment } from './environment.js'
const NODE_ENV = process.env.NODE_ENV
const appName= packagejson.name
const appVersion = `v${packagejson.version}`
const pageTitle = `${packagejson.name} ${appVersion}`

let config
if(NODE_ENV==='development' || WEBPACK_IS_DEVELOPMENT){
    config = {
        host: 'localhost',
        nodejsPort: 8888,
        socketioPort: 8888,
        name: appName+' dev',
        version: appVersion+' dev',
        pageTitle,
        environment: 'DEV'
    }

}else if(NODE_ENV==='production' || WEBPACK_IS_PRODUCTION){
    config = {
        host: 'motolocator.ml',
        nodejsPort: 8008,
        socketioPort: 8008,   // en produccion corre detras de un nginx y pasa por el reverse proxy
        name: appName,
        version: appVersion,
        pageTitle,
        environment: 'PROD'
    }

}else if(NODE_ENV==='testing' || WEBPACK_IS_TESTING){
    config = {
        host: 'localhost',
        nodejsPort: 3003,
        socketioPort: 3003,
        name: appName,
        version: appVersion,
        pageTitle,
        environment: 'TEST'
    }

}else {
    console.log(process.env)
    throw new Error("[config/app.js] NO environment selected")
}

export const appConfig = config