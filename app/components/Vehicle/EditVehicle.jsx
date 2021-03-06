// React, Redux, Router
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as vehicleActions from '../../actions/vehicleActions.js'

// Components
import VehicleForm from './VehicleForm.jsx'

@connect(
    (state)=> ({
        vehicles: state.vehicles
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            vehicleActions,
            dispatch
        )
    }
)
class EditVehicle extends React.Component {
    render() {
        return (
            <VehicleForm
                updateVehicle={this.props.updateVehicle}
                addVehicle={this.props.addVehicle}
                deleteVehicle={this.props.deleteVehicle}
                pushState={this.props.history.pushState}
                theVehicle={this.props.theVehicle}
            />
        )
    }
}
//EditVehicle.propTypes = {
//    theVehicle: PropTypes.object.isRequired
//}
export default EditVehicle