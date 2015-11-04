// Configuracion y variables de entorno
import { appConfig } from './config/index.js'
import { __IS_DEVELOPMENT__ } from './utils/environment.js'
// Express server
import app from './app/boot-server.js'

/**
 * Iniciar el servidor
 */
let server = app.listen(appConfig.port, function() {
    console.log(`Servicio iniciado en http://localhost:${appConfig.port}/`);
});


// we start a webpack-dev-server with our config
if(__IS_DEVELOPMENT__){
    let webpack = require('webpack')
    let WebpackDevServer = require('webpack-dev-server')
    let webpackConfigDev = require('./webpack.config.dev.js')
    new WebpackDevServer(webpack(webpackConfigDev), {
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
