import path from 'path'
import webpack from 'webpack'

module.exports = {
    entry:  [
        // WebpackDevServer host and port
        'webpack-dev-server/client?http://0.0.0.0:3001/',
        // "only" prevents reload on syntax errors
        'webpack/hot/only-dev-server',
        // Appʼs entry point
        './app/boot-client.jsx'
    ],
    output: {
        path:     path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3001/'
    },
    module: {
        loaders: [
            // no incluye presets ni plugins
            {test: /\.json$/, exclude: [/node_modules/, /public/], loader: 'json-loader'},
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'react-hot'},
            {test: /\.jsx?$/, exclude: [/node_modules/, /public/], loader: 'babel'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_IS_DEVELOPMENT: true,
            WEBPACK_IS_PRODUCTION:  false,
            WEBPACK_IS_TESTING:     false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map'
    //devServer: {
    //    hot: true,
    //    proxy: {
    //        //'*': 'http://localhost:' + (process.env.PORT || 8888)
    //        '*': 'http://localhost:' + 8888
    //    }
    //}
}