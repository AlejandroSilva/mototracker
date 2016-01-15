import React, { PropTypes } from 'react'

class Marker extends React.Component{
    componentDidMount(){
        // Linea que muestra por donde ha pasado el Marker
        this.polyline = L.polyline([]).addTo(this.props.map)
        // Icono del marker en el mapa
        this.marker = L.marker(this.props.position, {
            icon: L.icon({
                iconUrl: `http://${APP_HOST}:${APP_PORT}/icon/car-red.png`,
                iconSize: [24,24]
            })
        }).addTo(this.props.map)
        console.log(`${APP_HOST}/icon/car-fat.png`);

        console.log('Marker did mount, props: ', this.props)
        //this.props.map.setZoom(5)
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        // actualizar la posicion
        this.marker.setLatLng(this.props.position)

        // actualizar la linea
        if(this.props.drawLine===true){
            // si se mueve y no existian lineas, agregar el punto anterior tambien
            if(this.polyline.getLatLngs().length===0){
                this.polyline.addLatLng(prevProps.position)
            }
            this.polyline.addLatLng(this.props.position)
        }
    }

    render(){
        console.log('Marker render, props: ', this.props)
        return (
            <h1>this is a marker</h1>
        )
    }
}

Marker.propTypes = {
    //map: PropTypes.object.isRequired,     // pasado al hacer un clone
    drawLine: PropTypes.bool,
    position: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired         // [LAT, LONG] al revez de rethinkDB
}
Marker.defaultProps = {
    drawLine: false
}

export default Marker