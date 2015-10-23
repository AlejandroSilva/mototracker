// React, Redux, Router
import React, { PropTypes} from 'react'

class Alert extends React.Component{
    render(){
        if(!this.props.show){
            return <div></div>
        }else{
            return(
                <div className="alert alert-danger alert-dismissible">
                    {/*<button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>*/}
                    <h4><i className="icon fa fa-ban"></i> {this.props.title}</h4>
                    {this.props.message}
                </div>
            )
        }
    }
}
Alert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
}

export default Alert