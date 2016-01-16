import React, { PropTypes } from 'react'

class SimpleMap extends React.Component{
    constructor(props){
        super(props)
        this.state = ({
            mapId: props.mapId,
            nada : ''
        })
    }

    componentDidMount(){
        L.mapbox.accessToken = 'pk.eyJ1IjoiYXNpbHZhIiwiYSI6ImNpamRtZ2VrNTAwOTZ1MWpiYWRhajhjZXoifQ.y0vaPz6oGQuuh3pOE_8Qkg'
        this.mapboxmap = L.mapbox.map(this.state.mapId, 'mapbox.streets', {
            //accessToken:'pk.eyJ1IjoiYXNpbHZhIiwiYSI6ImNpamRtZ2VrNTAwOTZ1MWpiYWRhajhjZXoifQ.y0vaPz6oGQuuh3pOE_8Qkg'
        })

        this.mapboxmap.setView(this.props.center, this.props.zoom)
        // importante: cambiar el estado para forzar un render luego de haber creado el componente de mapbox
        this.setState({
            nada: 'nada'
        })
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        //console.log("did update")
        let { zoom, center } = this.props
        // update zoom
        if(zoom && zoom!==prevProps.zoom){
            this.mapboxmap.setZoom(zoom)
        }
        // update center
        if(center!==prevProps.center){
            //console.log('Center view on:', center)
            this.mapboxmap.setView(center)
        }

    }

    render(){
        // agregar la propiedad "map" a los children, para que puedan manipular el mapa
        return (
            <div id={this.state.mapId}>
                {(this.mapboxmap? React.Children.map(this.props.children, child => {
                    return child ? React.cloneElement(child, {map: this.mapboxmap}) : null;
                }) : null)}
            </div>
        )
    }
}

SimpleMap.propTypes = {
    mapId: PropTypes.string,
    center: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired         // [LAT, LONG] al revez de rethinkDB
}
SimpleMap.defaultProps = {
    mapId: 'defaultId'
}
export default SimpleMap