var path    = require('path');
var webpack = require('webpack');

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
    }
};