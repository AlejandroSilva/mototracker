// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Modules
import {
    ErrorPage
} from './ui/index.js'

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            ServersActions,
            dispatch
        )
    }
)
class ServerContainer extends React.Component {
    render() {
        // busca el servidor con el id que nos interesa
        let theServer = this.props.servers.list.find((server)=>this.props.params.id===server.id) || {}
        if(!theServer.name) {
            return <ErrorPage
                code={404}
                title="Servidor no encontrado"
                message="El servidor que busca no ha sido encontrado. Esto se puede deber a que el ID no sea el correcto, o que haya sido eliminado."
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
                                <b>{theServer.name}</b> ({theServer.host})
                                <small> {theServer.project}</small>
                            </h1>
                            <ul className="nav nav-tabs">
                                <li className={activePath==='data'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/data`} data-toggle="tab">
                                        Datos
                                    </Link>
                                </li>
                                <li className={activePath==='edit'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/edit`} data-toggle="tab">
                                        Configuración
                                    </Link>
                                </li>
                                <li className={activePath==='events'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/events`} data-toggle="tab">
                                        Eventos del servidor
                                    </Link>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {(
                                    this.props.children && React.cloneElement(this.props.children, {
                                        theServer
                                    })
                                )|| <h3>Seleccione una opcion</h3>}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}
export default ServerContainer