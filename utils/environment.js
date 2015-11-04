// leemos los datos desde el archivo package.json
let packagejson = require("../package.json")
export const __APP_NAME__= `"${packagejson.name}"`
export const __VERSION__ = `"v${packagejson.version}"`
const NODE_ENV = process.env.NODE_ENV
// verificamos que las variables globales sean validas
export const environment = (NODE_ENV==='production' || NODE_ENV==='testing')? NODE_ENV: 'development'

export const __IS_PRODUCTION__  = environment==='production'
export const __IS_TESTING__     = environment==='testing'
export const __IS_DEVELOPMENT__ = environment==='development'

console.log(`Configuración '${environment}' cargada.`)