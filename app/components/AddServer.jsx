// React, Redux, Router
import React, { PropTypes} from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Components
import {
    ServerForm
} from './ui/index.js'

@connect(
    (state)=> ({
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
class AddServer extends React.Component {
    render() {
        // Si a ServerForm, se le entrega un servidor, este generara un formulario para editarlo
        return (
            <ServerForm
                updateServer={this.props.updateServer}
                addServer={this.props.addServer}
                deleteServer={this.props.deleteServer}
                pushState={this.props.history.pushState}
                theServer={this.props.theServer}
            />
        )
    }
}
//AddServer.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default AddServer