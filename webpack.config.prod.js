var path    = require('path')
var webpack = require('webpack')
var packagejson = require("./package.json")

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
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'react-hot' },
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'babel', query: {stage: 0} }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            WEBPACK_VERSION: `"v${packagejson.version}"`,
            WEBPACK_NAME: `"${packagejson.name}"`,
            WEBPACK_IS_DEVELOPMENT: false,
            WEBPACK_IS_PRODUCTION:  true,
            WEBPACK_IS_TESTING:     false
        })
    ]
}