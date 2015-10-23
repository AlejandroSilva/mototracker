// ##  Store
// entrega los valores iniciales a la store (store tiene varios reducers asociados)
// const initialState = window.__INITIAL_STATE__ || 666
// const store = configureStore(initialState)

// Redux
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Router
import { reduxReactRouter } from 'redux-router'
import createHistory from '../../node_modules/react-router/node_modules/history/lib/createBrowserHistory'

// Reducers
import { combinedReducers, combinedInitialStates } from '../reducers/combinedReducers.js'

export default function configureStore(initialState){
    // store de produccion
    let store = compose(
        applyMiddleware(thunk),
        reduxReactRouter({
            createHistory
        })
    )(createStore)(combinedReducers, combinedInitialStates)
    return store
}