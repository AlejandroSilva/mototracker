// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as VehicleActions from '../actions/vehicleActions.js'

// Modules
import {
    ErrorPage
} from './ui/index.js'

@connect(
    (state)=> ({
        routerState: state.router,
        vehicles: state.vehicles
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            VehicleActions,
            dispatch
        )
    }
)
class VechicleContainer extends React.Component {
    render() {
        // busca el vehiculo con el id que nos interesa
        let theVehicle = this.props.vehicles.list.find((vehicle)=>this.props.params.id===vehicle.id) || {}
        if(!theVehicle.name) {
            return <ErrorPage
                code={404}
                title="Vehiculo no encontrado"
                message="El vehiculo que busca no ha sido encontrado. Esto se puede deber a que el ID no sea el correcto, o que haya sido eliminado."
                />
        }
        //console.log(this.props)
        const pathname = this.props.location.pathname
        const paths = pathname.split('/')
        const activePath = paths[paths.length-1]

        return (
            <div>
                <section className="content">
                    <div className="row">
                        <div className="nav-tabs-custom col-12-md">
                            <h1>
                                <b>{theVehicle.name}</b> (patente: {theVehicle.licenceID})
                                <small> {theVehicle.project}</small>
                            </h1>
                            <ul className="nav nav-tabs">
                                <li className={activePath==='data'? 'active':''}>
                                    <Link to={`/vehicle/${this.props.params.id}/data`} data-toggle="tab">
                                        Datos
                                    </Link>
                                </li>
                                <li className={activePath==='edit'? 'active':''}>
                                    <Link to={`/vehicle/${this.props.params.id}/edit`} data-toggle="tab">
                                        Configuración
                                    </Link>
                                </li>
                                <li className={activePath==='events'? 'active':''}>
                                    <Link to={`/vehicle/${this.props.params.id}/events`} data-toggle="tab">
                                        Eventos del vehiculo
                                    </Link>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {(
                                    this.props.children && React.cloneElement(this.props.children, {
                                        theVehicle
                                    })
                                )|| <h3>Seleccione una opcion</h3>}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}
export default VechicleContainer