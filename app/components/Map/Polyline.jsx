import React, { PropTypes } from 'react'

class Polyline extends React.Component{
    componentDidMount(){
        // Linea que muestra por donde ha pasado el Polyline
        this.polyline = L.polyline([]).addTo(this.props.map)

        // Icono del marker en el mapa
        //this.marker = L.marker(this.props.position, {
        //    icon: L.icon({
        //        iconUrl: `http://${APP_HOST}:${APP_PORT}/icon/car-red.png`,
        //        iconSize: [24,24]
        //    })
        //}).addTo(this.props.map)
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        // sin puntos, no mostrar nada
        if(this.props.path.length===0){
            this.polyline.setLatLngs([])
        }else{
            let parsedPoints = this.props.path.map(point=>{
                const coor = point.coordinate.coordinates
                return [coor[1], coor[0]]
            })
            console.log(parsedPoints)
            this.polyline.setLatLngs(parsedPoints)
        }
        // actualizar la posicion
        //this.marker.setLatLng(this.props.position)

        // actualizar la linea
        //if(this.props.drawLine===true){
        //    // si se mueve y no existian lineas, agregar el punto anterior tambien
        //    if(this.polyline.getLatLngs().length===0){
        //        this.polyline.addLatLng(prevProps.position)
        //    }
        //    this.polyline.addLatLng(this.props.position)
        //}
    }

    render(){
        //console.log('Polyline render, props: ', this.props)
        return (
            <h1>this is a marker</h1>
        )
    }
}

Polyline.propTypes = {
    path: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired
}

export default Polyline