import React, { PropTypes } from 'react'

class Box extends React.Component {
    render(){
        return (
            <div className="box box-solid" style={{marginBottom:'5px'}}>
                {this.props.children}
            </div>
        )
    }
}
export default Box