// Configuracion y variables de entorno
import { appConfig } from './config/app.js'

// Socket to use with RethinkDB
import socket from 'socket.io'
// Modelos
import Vehicle from './db/Vehicle.js'

// Express server
import app from './app/boot-server.js'

/**
 * Iniciar el servidor
 */
let server = app.listen(appConfig.nodejsPort, ()=> {
    console.log(`Iniciando: ${appConfig.name}, version ${appConfig.version}.`)
    console.log(`Configuración '${appConfig.environment}' cargada.`)
    console.log(`Servicio iniciado en http://${appConfig.host}:${appConfig.nodejsPort}/`)

    /**
     * cambios en RethinkDb
     */
    let io = socket(server)
    io.on('connection', (socket)=>{
        console.log('[SocketIO] new user connection')
        socket.on('disconnect', ()=>{
            console.log('[SocketIO] connection close')
        })
    })

    Vehicle
        .changes()
        .then((feed)=> {
            feed.each((err, vehicle)=> {
                if (err) {
                    return console.log(err)
                }
                if (!vehicle.isSaved()) {
                    // vehicle eliminado
                    io.emit('vehicleDeleted', vehicle)
                    console.log(`[SocketIO] 'vehicleDeleted' emited. (Server:${vehicle.id}).`)

                }else if (vehicle.getOldValue() === null) {
                    //Server.get(vehicle.id).includeIncidents().run().then((serverCreated)=> {
                    Vehicle.get(vehicle.id).run().then((newVehicle)=> {
                        // new vehicle
                        io.emit('vehicleCreated', newVehicle)
                        console.log(`[SocketIO] 'vehicleCreated' emited. (Server:${newVehicle.id}).`)
                    })

                }else{
                    //Server.get(vehicle.id).includeIncidents().run().then((serverUpdated)=> {
                    Vehicle.get(vehicle.id).run().then((vehicleUpdated)=> {
                        io.emit('vehicleUpdated', vehicleUpdated)
                        console.log(`[SocketIO] 'vehicleUpdated' emited. (Server:${vehicleUpdated.id}).`)
                    })
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})


// we start a webpack-dev-server with our config
if(appConfig.environment==='DEV'){
    let webpack = require('webpack')
    let WebpackDevServer = require('webpack-dev-server')
    let webpackConfigDev = require('./webpack.config.dev.js')
    new WebpackDevServer(webpack(webpackConfigDev), {
        hot: true,
        historyApiFallback: true,
        proxy: {
            "*": `http://${appConfig.host}:${appConfig.nodejsPort}/`
        }
    }).listen(3001, '0.0.0.0', (err, result)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('-----------------------------------------------------------------------')
            console.log('Hot reload para ver los cambios en las vistas automaticamente:')
            console.log('servidor iniciado en: http://localhost:3001/webpack-dev-server/fleet')
            console.log('-----------------------------------------------------------------------')
        }
    })
}
