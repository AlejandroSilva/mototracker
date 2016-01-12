// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as vehicleActions from '../actions/vehicleActions.js'

// Socket IO
import { appConfig } from '../../config/app.js'
import io from 'socket.io-client'
let socket = io.connect(`http://${appConfig.host}:${appConfig.socketioPort}`)

// BANNER
console.log(`CLIENTE: ${appConfig.name}, version ${appConfig.version}.`)
console.log(`Configuración '${appConfig.environment}' cargada.`)
console.log(`socketio conectando a: http://${appConfig.host}:${appConfig.socketioPort}`)

// Components
import {
    MenuCars,
    MenuEvents,
    MenuInform
} from './index.js'

@connect(
    (state)=> ({
        routerState: state.router,
        vehicles: state.vehicles
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            //CounterActions: CounterActions,
            //vehicleActions: vehicleActions
            Object.assign({}, CounterActions, vehicleActions),
            dispatch
        )
    }
)
class App extends React.Component {
    componentDidMount(){
        // Obtener la lista de vehiculos
        this.props.getVehicles(()=>{})

        //Cambios en los vehiculos
        //realizar la conexion por sockets para recibir los cambios
        socket.on('vehicleCreated', vehicle=>{
            console.log("vehicle created:", vehicle)
            this.props.addVehicleFromSocket(vehicle)
        })
        socket.on('vehicleUpdated', vehicle=>{
            console.log("vehicle updated: ", vehicle.updatedAt)
            this.props.updateVehicleFromSocket(vehicle)
        })
        socket.on('vehicleDeleted', vehicle=>{
            console.log("vehicle deleted: ", vehicle)
            this.props.deleteVehicleFromSocket(vehicle.id)
        })

    }
    render() {
        return (
                <div>
                    {/* Cabecera de la pagina */}
                    <header className="main-header">
                        <a href="index2.html" className="logo">
                            <span className="logo-mini"><b>T</b>H</span>
                            <span className="logo-lg"><b>{WEBPACK_NAME}</b> <small>{WEBPACK_VERSION}</small></span>
                        </a>

                        <nav className="navbar navbar-static-top" role="navigation">
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    <li className="dropdown messages-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-envelope-o"></i>
                                            <span className="label label-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    {/* Menu de navegacion lateral */}
                    <aside className="main-sidebar">
                        <section className="sidebar">
                            <ul className="sidebar-menu">
                                {/*<li className="header">Vehiculos</li>*/}

                                {/* Lista de vehiculos */}
                                <MenuCars vehicles={this.props.vehicles.list}/>

                                {/* Lista de Alertas */}
                                <MenuEvents />

                                {/* Informes */}
                                <MenuInform />
                            </ul>
                        </section>
                    </aside>

                    {/* Cuerpo de la pagina */}
                    <div className="content-wrapper" style={{minHeight: 1000+'px', maxWidth: 1000+'px'}}>
                        {this.props.children || "Seleccione un vehiculo desde el menu lateral"}
                    </div>
                </div>
        )
    }
}
App.propTypes = {
    children: React.PropTypes.node,
    vehicles: React.PropTypes.object
}
export default App