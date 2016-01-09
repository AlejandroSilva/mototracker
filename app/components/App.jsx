// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

// Components
import {
    MenuCars,
    MenuEvents,
    MenuInform
} from './index.js'

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            //CounterActions: CounterActions,
            //ServersActions: ServersActions
            Object.assign({}, CounterActions, ServersActions),
            dispatch
        )
    }
)
class App extends React.Component {
    componentDidMount(){
        // Obtener la lista de servidores
        this.props.getServers(()=>{})
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
                                <MenuCars servers={this.props.servers.list}/>

                                {/* Lista de Alertas */}
                                <MenuEvents />

                                {/* Informes */}
                                <MenuInform />
                            </ul>
                        </section>
                    </aside>

                    {/* Cuerpo de la pagina */}
                    <div className="content-wrapper" style={{minHeight: 1000+'px', maxWidth: 1000+'px'}}>
                        {this.props.children || "Seleccione un servidor desde el menu lateral"}
                    </div>
                </div>
        )
    }
}
App.propTypes = {
    children: React.PropTypes.node,
    servers: React.PropTypes.object
}
export default App