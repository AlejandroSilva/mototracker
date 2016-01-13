// React
import React from 'react'
import ReactDOM from 'react-dom'

// Router
import { Provider, connect } from 'react-redux'
import { Route, IndexRoute, Redirect } from 'react-router'
import { ReduxRouter } from 'redux-router'

// Components
import {
    App,
    FleetMapView,
    NotFound
} from './components/index.js'
import {
    VehicleContainer,
    VehicleActualView,
    EditVehicle,
    AddVehicle,
    VehicleTimelapse,
} from './components/Vehicle/'

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
        return (
            <Provider store={store}>
                <div>
                    <ReduxRouter>
                        <Route path="/" component={ App }>
                            <Route path="fleet" component={ FleetMapView } />
                            <Route path="vehicle/:id" component={ VehicleContainer }>
                                <Route path="actual" component={ VehicleActualView } />
                                <Route path="timelapse"   component={ VehicleTimelapse }/>
                                <Route path="edit"   component={ EditVehicle } />
                            </Route>
                            <Route path="add" component={ AddVehicle } />
                            {/*<Route path="map" component={ MapExample } />*/}
                            <Route path="*" component={ NotFound }></Route>
                        </Route>
                    </ReduxRouter>
                    {devToolsPanel}
                </div>
            </Provider>
        )
        // las rutas (Route) pueden tener un metodo onEnter y onLeave
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('appRoot')
)