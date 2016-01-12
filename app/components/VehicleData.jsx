// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class VehicleData extends React.Component {
    render() {
        let content
        if(!this.props.theVehicle.name){
            content = "[el vehiculo no existe]"

        }else if(this.props.theVehicle.currentData){
            content = <h3>some content goes here</h3>

        }else{
            content = <h3>Todavia no se reciben datos de este servidor</h3>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
export default VehicleData