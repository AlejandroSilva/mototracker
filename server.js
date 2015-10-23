import {
    appConfig,
    __IS_DEVELOPMENT__
} from './config/index.js'
import app from './app/boot-server.js'

/**
 * Iniciar el server
 */
let server = app.listen(appConfig.port, function() {
    console.log(`Servicio iniciado en http://localhost:${appConfig.port}/`);
});


// we start a webpack-dev-server with our config
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

if(__IS_DEVELOPMENT__){
    new WebpackDevServer(webpack(webpackConfig), {
        hot: true,
        historyApiFallback: true,
        proxy: {
            "*": `http://localhost:${appConfig.port}/`
        }
    }).listen(3001, '0.0.0.0', (err, result)=>{
            if (err) {
                console.log(err);
            }else{
                console.log('-----------------------------------------------------------------------')
                console.log('Hot reload para ver los cambios en las vistas automaticamente:')
                console.log('servidor iniciado en: http://localhost:3001/webpack-dev-server/servers')
                console.log('-----------------------------------------------------------------------')
            }
        });
}
