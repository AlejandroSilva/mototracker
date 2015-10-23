// ##  Store
// entrega los valores iniciales a la store (store tiene varios reducers asociados)
// const initialState = window.__INITIAL_STATE__ || 666
// const store = configureStore(initialState)

// Redux
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Redux devTools
import DevTools from '../components/ui/DevTools.jsx';

// Router
import { reduxReactRouter } from 'redux-router'
import createHistory from '../../node_modules/react-router/node_modules/history/lib/createBrowserHistory'

// Reducers
import { combinedReducers, combinedInitialStates } from '../reducers/combinedReducers.js'

export default function configureStore(initialState){
    // la store de desarrollo, incluye 'devTools' y puede hacer hot-reload de los reducers
    let store = compose(
        applyMiddleware(thunk),
        reduxReactRouter({
            createHistory
        }),
        DevTools.instrument()
        //devTools() //Only on development
    )(createStore)(combinedReducers, combinedInitialStates)

    if (module.hot) {
        console.log("actualizando reducer")
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/combinedReducers.js', () => {
            let nextRootReducer = require('../reducers/combinedReducers.js').combinedReducers;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store
}
