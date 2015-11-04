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
        new webpack.DefinePlugin({
            WEBPACK_VERSION: JSON.stringify('v'+packagejson.version),
            WEBPACK_NAME: JSON.stringify(packagejson.name),
            WEBPACK_IS_DEVELOPMENT: false,
            WEBPACK_IS_PRODUCTION:  true,
            WEBPACK_IS_TESTING:     false
        })
        //new webpack.optimize.UglifyJsPlugin()
    ]
}