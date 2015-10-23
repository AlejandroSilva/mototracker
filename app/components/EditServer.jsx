// React, Redux, Router
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Components
import { ServerForm } from './ui/index.js'

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
class EditServer extends React.Component {
    render() {
        return (
            <div className="box box-info">
                <div className="box-header with-border">
                    <h3 className="box-title">Actualizar datos del servidor</h3>
                </div>
                {/*Si a ServerForm, se le entrega un servidor, este generara un formulario para editarlo*/}
                <ServerForm
                    updateServer={this.props.updateServer}
                    addServer={this.props.addServer}
                    deleteServer={this.props.deleteServer}
                    pushState={this.props.history.pushState}
                    theServer={this.props.theServer}
                />
            </div>
        )
    }
}
//EditServer.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default EditServer