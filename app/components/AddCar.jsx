// React, Redux, Router
import React, { PropTypes} from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Components
import {
    CarForm
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
class AddCar extends React.Component {
    render() {
        // Si a CarForm, se le entregan los datos de un vehiculo, este generara un formulario para editarlo
        return (
            <CarForm
                updateServer={this.props.updateServer}
                addServer={this.props.addServer}
                deleteServer={this.props.deleteServer}
                pushState={this.props.history.pushState}
                theServer={this.props.theServer}
            />
        )
    }
}
//AddCar.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default AddCar