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

// API
import * as API from '../../apiClient/v1'

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
class VehicleEvents extends React.Component {
    constructor(...args){
        super(...args)
        this.state = {
            points: [],
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

        // Buscar los puntos
        // cambiar la busqueda del ultimo dia hasta las a las 24Hrs
        let endDate2 = range.endDate.clone()
        endDate2.hour(23).minute(59)
        //endDate2.add(1, 'days')
        //console.log(range.endDate);
        API.vehicle.getPoints(this.props.theVehicle.id, range.startDate, endDate2)
            .then(response=>{
                let points = response.points
                console.log(points)
                this.setState({
                    points,
                    message: points.length>0?
                        `${points.length} puntos ubicaciones encontradas entre ${startDate}, y ${endDate}.` :
                        `Sin ubicaciones encontradas entre ${startDate}, y ${endDate}.`
                })
            })
            .catch(err=>{
                console.log(err)
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