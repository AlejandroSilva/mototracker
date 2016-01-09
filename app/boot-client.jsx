// React
import React from 'react'
import ReactDOM from 'react-dom';

// Router
import { Provider, connect } from 'react-redux'
import { Route, IndexRoute, Redirect } from 'react-router'
import { ReduxRouter } from 'redux-router'

// Components
import {
    App,
    FleetMapView,
    CarContainer,
    CarData,
    EditCar,
    AddCar,
    CarEvents,
    NotFound
} from './components/index.js'
//import MapExample from './components/MapExample.jsx'

// Store
import configureStore from './store/configureStore.js'
let store = configureStore({})

// Dev Tools
// si esta en desarrollo, mostrar el panel lateral de reduxDevTools
let devToolsPanel
if( WEBPACK_IS_DEVELOPMENT ){
    var DevTools = require('./components/ui/DevTools.jsx')
    devToolsPanel =  <DevTools/>
}else{
    devToolsPanel = <div></div>
}

class Root extends React.Component {
    render() {
        // las rutas (Route) pueden tener un metodo onEnter y onLeave
        return (
            <Provider store={store}>
                <div>
                    <ReduxRouter>
                        <Route path="/" component={ App }>
                            <Route path="fleet" component={ FleetMapView } />
                            <Route path="car/:id" component={ CarContainer }>
                                {/*<IndexRoute component={ ServerData }/>*/}

                                <Route path="data"   component={ CarData } />
                                <Route path="edit"   component={ EditCar } />
                                <Route path="events" component={ CarEvents }/>
                            </Route>
                            <Route path="add" component={ AddCar } />
                            {/*<Route path="map" component={ MapExample } />*/}
                            <Route path="*" component={ NotFound }></Route>
                        </Route>
                    </ReduxRouter>
                    {devToolsPanel}
                </div>
            </Provider>
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('appRoot')
)