import React, { PropTypes } from 'react'

class BoxHeader extends React.Component {
    render(){
        return(
            <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                {this.props.children}
            </div>
        )
    }
}
export default BoxHeader