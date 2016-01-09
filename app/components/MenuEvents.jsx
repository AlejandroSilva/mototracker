// React, Router
import React from 'react'
import { Link } from 'react-router'

class MenuEvents extends React.Component {
    render() {
        return (
            <li className="treeview active">
                <a href="#">
                    <i className="fa fa-calendar"></i>
                    <span>Eventos</span>
                    <small className="label pull-right bg-red">5</small>
                </a>
                <ul className="treeview-menu">
                    <li>
                        <a href="#">Limite de velocidad<small className="label pull-right bg-red">2</small></a>
                    </li>
                    <li>
                        <a href="#">item2<small className="label pull-right bg-red">3</small></a>
                    </li>
                </ul>
            </li>
        )
    }
}
export default MenuEvents