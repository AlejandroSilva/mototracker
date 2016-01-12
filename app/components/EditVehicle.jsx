// React, Redux, Router
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as vehicleActions from '../actions/vehicleActions.js'

// Components
import { VehicleForm } from './ui/index.js'

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
            <div className="box box-info">
                <div className="box-header with-border">
                    <h3 className="box-title">Actualizar datos del servidor</h3>
                </div>
                {/*Si a VehicleForm, se le entregan datos , este generara un formulario para editarlo*/}
                <VehicleForm
                    updateVehicle={this.props.updateVehicle}
                    addVehicle={this.props.addVehicle}
                    deleteVehicle={this.props.deleteVehicle}
                    pushState={this.props.history.pushState}
                    theVehicle={this.props.theVehicle}
                />
            </div>
        )
    }
}
//EditVehicle.propTypes = {
//    theVehicle: PropTypes.object.isRequired
//}
export default EditVehicle