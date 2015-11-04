// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

// Components
import { ServersList } from './index.js'

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
    static propTypes = {
        children: React.PropTypes.node,
        servers: React.PropTypes.object
    }
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

                                <li className="header">SERVIDORES</li>

                                <li className="treeview active">
                                    <a href="#">
                                        <i className="fa fa-calendar"></i> <span>Menu</span>
                                        <small className="label pull-right bg-red">3</small>
                                    </a>
                                    <ul className="treeview-menu">
                                        <li><a href="#">item1</a></li>
                                        <li><a href="#">item2</a></li>
                                    </ul>
                                </li>

                                <ServersList className="treeview active" servers={this.props.servers.list}/>

                                <button type="button" className="btn btn-info">Action</button>
                                <i className="fa fa-cogs">XXX</i>

                            </ul>
                            <button onClick={ this.props.create }>App.CREATE_SERVER</button>
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

export default App