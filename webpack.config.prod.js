let path    = require('path')
let webpack = require('webpack')
import { appConfig } from './config/app.js'

module.exports = {
    entry:  [
        './app/boot-client.jsx'
    ],
    output: {
        path:     path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            //{test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot','babel'] }
            {test: /\.json$/, exclude: [/node_modules/, /public/], loader: 'json-loader'},
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'react-hot' },
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'babel' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            APP_NAME: `'appConfig.name'`,
            APP_VERSION: `'appConfig.version'`,
            APP_HOST: `'appConfig.host'`,
            APP_PORT: `'appConfig.port'`,
            WEBPACK_IS_DEVELOPMENT: false,
            WEBPACK_IS_PRODUCTION:  true,
            WEBPACK_IS_TESTING:     false
        })
    ]
}