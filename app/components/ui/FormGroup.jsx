// React, Redux, Router
import React, { PropTypes } from 'react'

class FormGroup extends React.Component{
    render() {
        if(this.props.horizontal){
            // Horizontal Element
            return(
                <div className="form-group">
                    <label className="col-sm-2 control-label">{this.props.label}</label>
                    <div className="col-sm-10">
                        {this.props.children}
                    </div>
                </div>
            )
        }else{
            // Vertical Element
            return(
                <div className="form-group">
                    <label className="control-label">{this.props.label}</label>
                    {this.props.children}
                </div>
            )
        }
    }
}
FormGroup.propTypes = {
    horizontal: PropTypes.bool,
    label: PropTypes.string.isRequired
}
FormGroup.defaultProps = {
    horizontal: true
}

export default FormGroup