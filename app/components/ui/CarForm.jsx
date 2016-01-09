// React, Redux, Router
import React, { PropTypes} from 'react'

// Components
import Alert from './Alert.jsx'
import FormGroup from './FormGroup.jsx'

class CarForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: '',
            server: {
                id: this.props.theServer.id,
                name: this.props.theServer.name,
                host: this.props.theServer.host,
                port: this.props.theServer.port,
                project: this.props.theServer.project
            }
        }
    }
    handleChange(element, e){
        let server = this.state.server
        server[element] = e.target.value
        this.setState({
            error: '',
            server: server
        })
    }
    sendForm(evt){
        evt.preventDefault()

        if(this.state.server.id!==''){
            this.update(this.state.server)
        }else{
            this.create(this.state.server)
        }
    }
    update(server){
        this.props.updateServer(server, (err, newData)=>{
            if(err){
                this.setState({error: err.data? err.data.error : err.toString()})
            }else{
                this.setState({error: ''})
            }
        })
    }
    create(server){
        this.props.addServer(server, (err, newServer)=>{
            if(err){
                this.setState({error: err.data? err.data.error : err.toString()})
            }else{
                // Redireccionar a la pagina del servidor
                this.props.pushState(null, `/server/${newServer.id}/data`)
            }
        })
    }
    deleteServer(){
        this.props.deleteServer(this.state.server.id, (errorMessage, resp)=>{
            if(errorMessage){
                this.setState({error: errorMessage})
            }else{
                // al eliminar, redireccionar al listado de servidores
                this.props.pushState(null, '/servers')
            }
        })
    }
    render() {
        return (
            <div className="box box-info">
                <div className="box-header with-border">
                    <h3 className="box-title">{this.state.server.id? 'Actualizar datos' : 'Agregar vehiculo'}</h3>
                </div>
                <form className="form-horizontal" onSubmit={this.sendForm.bind(this)}>
                    <div className="box-body">
                        <FormGroup label="ID">
                            <input type="text" className="form-control"
                                   value={this.state.server.id}
                                   disabled
                                />
                        </FormGroup>
                        <FormGroup label="Nombre">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.server.name}
                                   onChange={this.handleChange.bind(this, 'name')}
                                   placeholder="Nombre. Ej. CAO Biopacs"
                                   required
                                />
                        </FormGroup>
                        <FormGroup label="Host">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.server.host}
                                   onChange={this.handleChange.bind(this, 'host')}
                                   placeholder="Host. Ej. cao.biopacs.com"
                                   required
                                />
                        </FormGroup>
                        <FormGroup label="Puerto">
                            <input type="number" className="form-control"
                                   defaultValue={this.state.server.port}
                                   onChange={this.handleChange.bind(this, 'port')}
                                   placeholder="Port. Ej. 8081"
                                />
                        </FormGroup>
                        <FormGroup label="Proyecto">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.server.project}
                                   onChange={this.handleChange.bind(this, 'project')}
                                   placeholder="Proyecto. Ej. Clinica Alemana Osorno"
                                   required
                                />
                        </FormGroup>
                        <div className="col-sm-offset-2 col-sm-10">
                            <Alert title="Ocurrio un problema" message={this.state.error} show={this.state.error!==''}/>
                        </div>
                    </div>

                    <div className="box-footer">
                        { this.state.server.id!==''?
                            <button type="button" className="btn btn-danger" onClick={this.deleteServer.bind(this)}>
                                <i className='fa fa-warning'></i>
                                Eliminar
                            </button>
                        : null}
                        <button type="submit" className="btn btn-primary pull-right">
                            <i className='fa fa-pencil'></i>
                            {this.state.server.id? 'Actualizar': 'Agregar Nuevo'}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
CarForm.propTypes = {
    updateServer: PropTypes.func.isRequired,
    addServer: PropTypes.func.isRequired,
    deleteServer: PropTypes.func.isRequired,
    theServer: PropTypes.object.isRequired
}
CarForm.defaultProps = {
    theServer: {
        id: '',
        name: '',
        host: '',
        port: 8008,
        project: ''
    }
}

export default CarForm