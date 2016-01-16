// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import timeago from '../../../utils/timeago.js'

// Components
import { FormGroup } from './../ui/index'
import SimpleMap from '../Map/SimpleMap.jsx'
import Marker from '../Map/Marker.jsx'

class VehicleActualView extends React.Component {
    render() {
        const theVehicle = this.props.theVehicle

        let content
        if(!theVehicle.name){
            content = "[el vehiculo no existe]"

        }else if(theVehicle.lastData && theVehicle.lastData.raw){

            content = (
                    <div className="box box-info">
                        <div className="box-header with-border">
                            <h3 className="box-title">{'Ubicación actual del vehiculo'}</h3>
                        </div>
                        <div className="box-body">
                            <div className="row">
                                <SimpleMap
                                    mapId="vehiclemap"
                                    center={[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                                    zoom={15}
                                >
                                    <Marker
                                        position={[theVehicle.lastData.coordinate[1], theVehicle.lastData.coordinate[0]]}
                                        drawLine={true}
                                    />
                                </SimpleMap>
                            </div>


                            {/* DATOS DE LA ULTIMA UBICACION */}
                            <form className="form-horizontal" onSubmit={()=>{}}>
                                <div className="box-body">
                                    <FormGroup label="Lat,Long">
                                        <input type="text" className="form-control"
                                               value={`${theVehicle.lastData.coordinate[0]}, ${theVehicle.lastData.coordinate[1]}`}
                                               disabled
                                        />
                                    </FormGroup>
                                    <FormGroup label="Fecha y hora">
                                        <input type="text" className="form-control"
                                               value={theVehicle.lastData.utcDatetime}
                                               disabled
                                        />
                                    </FormGroup>
                                    <FormGroup label="Velocidad">
                                        <input type="text" className="form-control"
                                               value={`${theVehicle.lastData.speed} Kms/Hr`}
                                               disabled
                                        />
                                    </FormGroup>
                                    <FormGroup label="Dirección">
                                        <input type="text" className="form-control"
                                               value={`${theVehicle.lastData.curse} grados`}
                                               disabled
                                        />
                                    </FormGroup>
                                    <FormGroup label="Bateria">
                                        <input type="text" className="form-control"
                                               value={`${theVehicle.lastData.vbat}% restante`}
                                               disabled
                                        />
                                    </FormGroup>
                                    <FormGroup label="Visto hace:">
                                        <input type="text" className="form-control"
                                               value={timeago(theVehicle.lastData.utcDatetime)}
                                               disabled
                                        />
                                    </FormGroup>
                                </div>
                            </form>
                        </div>
                    </div>
                )
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