let packagejson = require("../package.json")
import { environment } from './environment.js'

export const __APP_NAME__= `"${packagejson.name}"`
export const __VERSION__ = `"v${packagejson.version}"`
export const pageTitle = `${packagejson.name} ${__VERSION__}`

let config
if(environment==='development'){
    config = {
        host: 'localhost',
        nodejsPort: 8888,
        socketioPort: 8888,
        name: __APP_NAME__,
        version: __VERSION__,
        pageTitle,
        environment: 'DEV'
    }

}else if(environment==='production'){
    config = {
        host: 'motolocator.ml',
        nodejsPort: 8008,
        socketioPort: 8008,   // en produccion corre detras de un nginx y pasa por el reverse proxy
        name: __APP_NAME__,
        version: __VERSION__,
        pageTitle,
        environment: 'PROD'
    }

}else if(environment==='testing'){
    config = {
        host: 'localhost',
        nodejsPort: 3003,
        socketioPort: 3003,
        name: __APP_NAME__,
        version: __VERSION__,
        pageTitle,
        environment: 'TEST'
    }

}else {
    throw new Error("[config/app.js] NO environment selected")
}

export const appConfig = config