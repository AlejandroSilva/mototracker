// React, Redux, Router
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class ServerDataAsRow extends React.Component {
    render() {
        if(!this.props.server.name) {
            return (
                <div className="row">
                    <h3>servidor no existe</h3>
                </div>
            )
        }
        const currentData = this.props.server.currentData
        if(!currentData){
            return (
                <div className="row">
                    <h3>Todavia no se reciben datos de este servidor</h3>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-3">
                    <h3>disc mounted</h3>
                </div>
                <div className="col-md-3">
                    <h3>ping1</h3>
                    <h3>ping2</h3>
                </div>
                <div className="col-md-3">
                    <h3>memory</h3>
                    <h3><cpu></cpu></h3>
                </div>
                <div className="col-md-3">
                    <h3>dicom</h3>
                    <h3>net</h3>
                    <h3>disc io</h3>
                </div>
            </div>
        )
    }
}
ServerDataAsRow.propTypes = {
    server: PropTypes.object.isRequired
}
export default ServerDataAsRow