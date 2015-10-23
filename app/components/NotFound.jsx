// React
import React from 'react'

// Components
import { ErrorPage } from './ui/index.js'

class NotFound extends React.Component{
    render(){
        return(
            <ErrorPage
                code={404}
                title="Oops! Pagina no encontrada."
                message="La pagina que ha solicitado no se encuentra disponible, esto puede ser debido
                a que la ruta ha cambiado, o la dirección que ha escrito es incorrecta."
            />
        )
    }
}
export default NotFound