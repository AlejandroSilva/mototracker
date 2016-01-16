import React, { PropTypes } from 'react'

// quitar de aca
let carIcon = L.icon({
    iconUrl: `http://${APP_HOST}:${APP_PORT}/icon/car-red.png`,
    iconSize: [24,24]
})

class Polyline extends React.Component{
    componentDidMount(){
        // Linea que muestra por donde ha pasado el Polyline
        this.polyline = L.polyline([]).addTo(this.props.map)

        // Icono del marker en el mapa
        //this.marker = null
        //this.markerExist = false
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        if(this.props.path.length===0){
            // sin puntos, no mostrar la linea
            this.polyline.setLatLngs([])

            // y quitar el marker
            //if(this.markerExist) {
                //this.marker.removeFrom(this.props.map)
                //console.log("quitando el marker");
                //this.props.map.removeLayer(this.marker)
                //this.markerExist = false
            //}
        }else{
            // con puntos, agregar la linea
            let parsedPoints = this.props.path.map(point=>{
                const coor = point.coordinate.coordinates
                return [coor[1], coor[0]]
            })
            //console.log(parsedPoints)
            this.polyline.setLatLngs(parsedPoints)

            // agregar un marker en el ultimo punto
            //this.marker = L.marker(parsedPoints[parsedPoints.length-1], {
            //    icon: carIcon
            //}).addTo(this.props.map)
            //this.props.map.removeLayer(this.marker)
            //this.props.map.removeLayer(this.marker)
            //this.markerExist = true
        }
    }

    render(){
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