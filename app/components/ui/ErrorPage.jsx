// React, Redux, Router
import React, { PropTypes } from 'react'

class ErrorMessage extends React.Component{
    render() {
        return (
            <section className="content">
                <div className="error-page">
                    <h2 className="headline text-yellow"> {this.props.code}</h2>
                    <div className="error-content">
                        <h3>
                            <i className="fa fa-warning text-yellow"></i> {this.props.title}
                        </h3>
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </section>
        )
    }
}
ErrorMessage.propTypes = {
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default ErrorMessage