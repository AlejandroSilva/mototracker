// React, Redux, Router
import React, { PropTypes } from 'react'

// Components
import Alert from './Alert.jsx'
import FormGroup from './FormGroup.jsx'

class VehicleForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: '',
            vehicle: {
                id: this.props.theVehicle.id,
                name: this.props.theVehicle.name,
                licenceId: this.props.theVehicle.licenceId,
                model: this.props.theVehicle.model,
                maker: this.props.theVehicle.maker,
                gpsId: this.props.theVehicle.gpsId
            }
        }
    }
    handleChange(element, e){
        let vehicle = this.state.vehicle
        vehicle[element] = e.target.value
        this.setState({
            error: '',
            vehicle: vehicle
        })
    }
    sendForm(evt){
        evt.preventDefault()

        if(this.state.vehicle.id!==''){
            this.update(this.state.vehicle)
        }else{
            this.create(this.state.vehicle)
        }
    }
    update(vehicle){
        this.props.updateVehicle(vehicle, (err, newData)=>{
            if(err){
                this.setState({error: err.data? err.data.error : err.toString()})
            }else{
                this.setState({error: ''})
            }
        })
    }
    create(vehicle){
        this.props.addVehicle(vehicle, (err, newVehicle)=>{
            if(err){
                this.setState({error: err.data? err.data.error : err.toString()})
            }else{
                // Redireccionar a la pagina del vehiculo
                this.props.pushState(null, `/vehicle/${newVehicle.id}/data`)
            }
        })
    }
    deleteVehicle(){
        this.props.deleteVehicle(this.state.vehicle.id, (errorMessage, resp)=>{
            if(errorMessage){
                this.setState({error: errorMessage})
            }else{
                // al eliminar, redireccionar al listado de vehiculos
                this.props.pushState(null, '/fleet')
            }
        })
    }
    render() {
        return (
            <div className="box box-info">
                <div className="box-header with-border">
                    <h3 className="box-title">{this.state.vehicle.id? 'Actualizar datos' : 'Agregar vehiculo'}</h3>
                </div>
                <form className="form-horizontal" onSubmit={this.sendForm.bind(this)}>
                    <div className="box-body">
                        <FormGroup label="ID">
                            <input type="text" className="form-control"
                                   value={this.state.vehicle.id}
                                   disabled
                                />
                        </FormGroup>
                        <FormGroup label="Nombre">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.vehicle.name}
                                   onChange={this.handleChange.bind(this, 'name')}
                                   placeholder="Nombre. Ej. Moto renegade"
                                   required
                                />
                        </FormGroup>
                        <FormGroup label="Patente">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.vehicle.licenceId}
                                   onChange={this.handleChange.bind(this, 'licenceId')}
                                   placeholder="Patente. Ej. ED-KF-67"
                                   required
                                />
                        </FormGroup>
                        <FormGroup label="Modelo">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.vehicle.model}
                                   onChange={this.handleChange.bind(this, 'model')}
                                   placeholder="Modelo. Ej. Renegade 2015"
                                />
                        </FormGroup>
                        <FormGroup label="Marca">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.vehicle.maker}
                                   onChange={this.handleChange.bind(this, 'maker')}
                                   placeholder="Marca. Ej. United Motors"
                                   required
                                />
                        </FormGroup>
                        <FormGroup label="Identificador del GPS">
                            <input type="text" className="form-control"
                                   defaultValue={this.state.vehicle.gpsId}
                                   onChange={this.handleChange.bind(this, 'gpsId')}
                                   placeholder="Identificador unico. Ej. 131313"
                                   required
                            />
                        </FormGroup>
                        <div className="col-sm-offset-2 col-sm-10">
                            <Alert title="Ocurrio un problema" message={this.state.error} show={this.state.error!==''}/>
                        </div>
                    </div>

                    <div className="box-footer">
                        { this.state.vehicle.id!==''?
                            <button type="button" className="btn btn-danger" onClick={this.deleteVehicle.bind(this)}>
                                <i className='fa fa-warning'></i>
                                Eliminar
                            </button>
                        : null}
                        <button type="submit" className="btn btn-primary pull-right">
                            <i className='fa fa-pencil'></i>
                            {this.state.vehicle.id? 'Actualizar': 'Agregar Nuevo'}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
VehicleForm.propTypes = {
    updateVehicle: PropTypes.func.isRequired,
    addVehicle: PropTypes.func.isRequired,
    deleteVehicle: PropTypes.func.isRequired,
    theVehicle: PropTypes.object.isRequired
}
VehicleForm.defaultProps = {
    theVehicle: {
        id: '',
        name: '',
        licenceId: '',
        model: '',
        maker: '',
        gpsId: ''
    }
}

export default VehicleForm