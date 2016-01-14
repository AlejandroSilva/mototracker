// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import timeago from '../../../utils/timeago.js'


import SimpleMap from '../Map/SimpleMap.jsx'
import Marker from '../Map/Marker.jsx'

class VehicleActualView extends React.Component {
    render() {
        const theVehicle = this.props.theVehicle

        let content
        if(!theVehicle.name){
            content = "[el vehiculo no existe]"

        }else if(theVehicle.lastData && theVehicle.lastData.raw){

            content = <div>
                <SimpleMap
                    mapId="vehiclemap"
                    center={[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                    zoom={15}
                >
                    <Marker
                        position = {[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                    />
                </SimpleMap>
                <p>Lat,Long:   {theVehicle.lastData.coordinate[0]}, {theVehicle.lastData.coordinate[1]}</p>
                <p>hora:       {theVehicle.lastData.utcDatetime}</p>
                <p>visto hace: {timeago(theVehicle.lastData.utcDatetime)}</p>
                <p>Speed:      {theVehicle.lastData.speed}</p>
                <p>Curse:      {theVehicle.lastData.curse}</p>
                <p>vbat:       {theVehicle.lastData.vbat}</p>
            </div>
        }else{
            content = <h3>Todavia no se reciben datos de este vehiculo</h3>
        }

        return (
            <div>
                {(content)}
            </div>
        )
    }
}
export default VehicleActualView