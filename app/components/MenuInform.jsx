
import React from 'react'
import { Link } from 'react-router'

class MenuInform extends React.Component {
    render() {
        return (
            <li className="treeview active">
                <a href="#"><i className="fa fa-calendar"></i>
                    <span>Reportes</span>
                </a>
                <ul className="treeview-menu">
                    <li><a href="#">Recorridos realizados</a></li>
                    <li><a href="#">Velocidad</a></li>
                    <li><a href="#">Horarios de uso</a></li>
                </ul>
            </li>
        )
    }
}
export default MenuInform