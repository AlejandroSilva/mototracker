/// React, Router
import React from 'react'
import { Link } from 'react-router'

class MenuCars extends React.Component {
    render() {
        return (
            <li className="treeview active">
                <a href="#">
                    <i className="fa fa-calendar"></i> <span>Vehiculos</span>
                    <small className="label pull-right bg-red">3</small>
                </a>
                <ul className="treeview-menu">
                    <li key='0' ><Link to={'/fleet'}>
                        <i className="fa fa-circle-o text-yellow"></i>
                        Ver todos
                    </Link></li>
                    {this.props.vehicles.map((vehicle, index)=> {
                        return (
                            <li key={vehicle.id}>
                                <Link to={`/vehicle/${vehicle.id}/actual`}>
                                    <i className="fa fa-circle-o"></i>
                                    {vehicle.name}
                                </Link>
                            </li>
                        )
                     })}
                    {/*
                    <li key='100' ><Link to={'/vehicle/estaidnoexiste/actual'}>
                        <i className="fa fa-circle-o"></i>
                        AB-12-34(no existe en BD)
                    </Link></li>
                    */}
                    <li key='999' ><Link to={'/add'}>
                        <i className="fa fa-circle-o text-aqua"></i>
                        Agregar nuevo
                    </Link></li>
                </ul>
            </li>
        )
    }
}
export default MenuCars