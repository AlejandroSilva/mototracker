// React, Redux, Router
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as vehicleActions from '../../actions/vehicleActions.js'

// Components
import { DateRange, defaultRanges} from 'react-date-range'

import SimpleMap from '../Map/SimpleMap.jsx'
import Marker from '../Map/Marker.jsx'

//@connect(
//    (state)=> ({
//        vehicles: state.vehicles
//    }),
//    (dispatch)=>{
//        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
//        return bindActionCreators(
//            vehicleActions,
//            dispatch
//        )
//    }
//)
class VehicleEvents extends React.Component {
    constructor(...args){
        super(...args)
        this.state = {
            startDate: null,
            endDate: null,
            message: '....'
        }
    }
    rangeSelected(range){
        const startDate = range.startDate.format('DD/MM/YYYY') // h:mma
        const endDate = range.endDate.format('DD/MM/YYYY')

        this.setState({
            startDate: range.startDate,
            endDate: range.endDate,
            message: startDate===endDate? `Buscando datos del: ${startDate}...` :
                `Buscando datos entre: ${startDate}, y ${endDate}...`
        })
    }
    render() {
        const theVehicle = this.props.theVehicle

        if(!theVehicle.name){
            return "[el vehiculo no existe]"

        }else if(theVehicle.lastData && theVehicle.lastData.raw){
            return (
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">{'Recorrido del vehículo en un periodo de tiempo'}</h3>
                    </div>
                    <div className="box-body">
                        <h3>Selecciona un rango de dias:</h3>
                        <DateRange
                            ranges={defaultRanges}
                            onChange={this.rangeSelected.bind(this)}
                            firstDayOfWeek={1}
                        />

                        <h3>{this.state.message}</h3>
                        <h1>HACER LA PETICION AL SERVIDOR!!!!!!!!!!</h1>
                        <div className="row">
                            <SimpleMap
                                mapId="vehiclemap"
                                center={[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                                zoom={15}>

                                <Marker
                                    position={[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                                    drawLine={true}
                                />
                            </SimpleMap>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <h3>Todavia no se reciben datos de este vehiculo</h3>
        }
    }
}
export default VehicleEvents