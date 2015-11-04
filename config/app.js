import {
    __VERSION__,
    __APP_NAME__
} from '../utils/environment'

const pageTitle = `Gps tracker ${__VERSION__}`

export const development = {
    port: 8888,
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}

export const production = {
    port: 8008,
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}

export const testing = {
    port: 3003,
    name: __APP_NAME__,
    version: __VERSION__,
    pageTitle
}