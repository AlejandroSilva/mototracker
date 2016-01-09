// React, Redux
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Modules

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            ServersActions,
            dispatch
        )
    }
)
class ServersView extends React.Component {
    render() {
        return (
            <section className="content">
                <h3>mapa con todos los vehiculos</h3>
            </section>
        )
    }
}
ServersView.propTypes = {
    children: React.PropTypes.node
}
export default ServersView