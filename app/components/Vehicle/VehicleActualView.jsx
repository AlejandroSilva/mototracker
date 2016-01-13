// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class VehicleActualView extends React.Component {
    render() {
        const theVehicle = this.props.theVehicle
        console.log(theVehicle.lastData);
        let content
        if(!theVehicle.name){
            content = "[el vehiculo no existe]"

        }else if(theVehicle.lastData && theVehicle.lastData.raw){

            content = <div>
                <p>{theVehicle.lastData.coordinate[0]}</p>
                <p>{theVehicle.lastData.coordinate[1]}</p>
                <p>{theVehicle.lastData.speed}</p>
                <p>{theVehicle.lastData.curse}</p>
            </div>
        }else{
            content = <h3>Todavia no se reciben datos de este vehiculo</h3>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
export default VehicleActualView