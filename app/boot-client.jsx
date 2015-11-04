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
    ServersView,
    ServerContainer,
    ServerData,
    EditServer,
    AddServer,
    ServerEvents,
    NotFound
} from './components/index.js'

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
                            <Route path="servers" component={ ServersView } />
                            <Route path="add" component={ AddServer } />
                            <Route path="server/:id" component={ ServerContainer }>
                                {/*<IndexRoute component={ ServerData }/>*/}

                                <Route path="data"   component={ ServerData } />
                                <Route path="edit"   component={ EditServer } />
                                <Route path="events" component={ ServerEvents }/>
                            </Route>
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