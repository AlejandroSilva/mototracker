// Solo llamar en server side.
// si se necesitan las variables en frontend, usar las globales de webpack

var packagejson = require("../package.json")
//import { environment } from './environment.js'
var NODE_ENV = process.env.NODE_ENV
var appName= packagejson.name
var appVersion = `v${packagejson.version}`
var pageTitle = `${packagejson.name} ${appVersion}`
var utcOffset = "-03:00"

var config
if(NODE_ENV==='development'){
    config = {
        host: 'localhost',
        nodejsPort: 8888,
        name: appName,
        version: appVersion,
        pageTitle,
        environment: 'DEV',
        utcOffset
    }

}else if(NODE_ENV==='production'){
    config = {
        host: 'motolocator.ml',
        nodejsPort: 8008,
        name: appName,
        version: appVersion,
        pageTitle,
        environment: 'PROD',
        utcOffset
    }

}else if(NODE_ENV==='testing'){
    config = {
        host: 'localhost',
        nodejsPort: 3003,
        name: appName,
        version: appVersion,
        pageTitle,
        environment: 'TEST',
        utcOffset
    }

}else {
    console.log(process.env)
    throw new Error("[config/app.js] NO environment selected")
}

module.exports = config