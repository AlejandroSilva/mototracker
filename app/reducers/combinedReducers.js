// Redux, Redux-router
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

// Reducers
import counterReducer from './counterReducer'
import { vehicleReducer, vehicleDefaultState } from './vehicleReducer.js'


const combinedReducers = combineReducers({
    counter: counterReducer,
    vehicles: vehicleReducer,
    router: routerStateReducer
})

const combinedInitialStates = {
    counter: 33,
    vehicles: vehicleDefaultState
}

export { combinedReducers , combinedInitialStates }