import {
    __VERSION__,
    __APP_NAME__
} from '../utils/environment'

const pageTitle = `Gps tracker ${__VERSION__}`

export const development = {
    nodejsPort: 8888,
    socketioPort: 8888,
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}

export const production = {
    nodejsPort: 8008,
    socketioPort: 8008,   // en produccion corre detras de un nginx y pasa por el reverse proxy
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}

export const testing = {
    nodejsPort: 3003,
    socketioPort: 3003,
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}