let configureStore
if(WEBPACK_IS_DEVELOPMENT){
    configureStore = require('./configureStore.dev.js')
}else{
    configureStore = require('./configureStore.prod.js')
}

export default configureStore