// React, Redux, Router
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as vehicleActions from '../actions/vehicleActions.js'

@connect(
    (state)=> ({
        servers: state.servers
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            vehicleActions,
            dispatch
        )
    }
)
class ServerEvents extends React.Component {
    render() {
        return (
            <p>listado de eventos de un servidor</p>
        )
    }
}
export default ServerEvents