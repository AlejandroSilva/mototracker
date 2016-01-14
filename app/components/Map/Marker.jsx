import React, { PropTypes } from 'react'

class Marker extends React.Component{
    componentDidMount(){
        this.marker = L.marker(this.props.position, {
            icon: L.mapbox.marker.icon({
                'marker-color': '#f86767'
            })
        })
        this.marker.addTo(this.props.map)

        console.log('Marker did mount, props: ', this.props)
        //this.props.map.setZoom(5)
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        this.marker.setLatLng(this.props.position)

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
    position: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired         // [LAT, LONG] al revez de rethinkDB
}

export default Marker