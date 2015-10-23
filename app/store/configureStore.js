// Config
import { __IS_DEVELOPMENT__ } from '../../config/index.js'

let configureStore
if(__IS_DEVELOPMENT__){
    configureStore = require('./configureStore.dev.js')
}else{
    configureStore = require('./configureStore.prod.js')
}

export default configureStore