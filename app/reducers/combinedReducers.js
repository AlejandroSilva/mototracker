// Redux, Redux-router
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

// Reducers
import counterReducer from './counterReducer'
import { serversReducer, serversDefaultState } from './serversReducer.js'


const combinedReducers = combineReducers({
    counter: counterReducer,
    servers: serversReducer,
    router: routerStateReducer
})

const combinedInitialStates = {
    counter: 33,
    servers: serversDefaultState
}

export { combinedReducers , combinedInitialStates }