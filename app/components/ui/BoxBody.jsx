import React, { PropTypes } from 'react'

class BoxBody extends React.Component {
    render(){
        return(
            <div className="box-body" style={{paddingTop: '0px', paddingBottom: '3px'}}>
                {this.props.children}
            </div>
        )
    }
}
export default BoxBody