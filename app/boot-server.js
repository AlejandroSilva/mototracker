import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { appConfig } from '../config/index'
let app = express()

/**
 * Options
 */
app.set('view cache', false)

/**
 * Middlewares
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.use(morgan('combined'))
// serving static files
app.use(express.static('public'))

/**
 * Routes
 */
import v1 from '../api/v1/index.js'
app.use('/v1/', v1)

// React + Redux libs
import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

app.get('/*', function (req, res) {
    //let location = createLocation(req.url)

    //fetchCounter( (apiResult)=>{
        // Entregar un estado inicial de las Store al usuario
        //let store = configureStore({
        //    counter: 10,
        //    servers: [1, 23, 4, 4]
        //})
        //let initialState = store.getState()

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
                    <title>${appConfig.pageTitle}</title>
                    <!-- Bootstrap 3.3.5 -->
                    <link type="text/css" rel="stylesheet" href="/bootstrap/bootstrap.min.css">
                    <!-- AdminLTE -->
                    <link type="text/css" rel="stylesheet" href="/adminlte/css/AdminLTE.min.css">
                    <link type="text/css" rel="stylesheet" href="/adminlte/css/skins/skin-blue.min.css">
                    <!-- Font-awesome -->
                    <link type="text/css" rel="stylesheet" href="/font-awesome/font-awesome.min.css">
                    <!-- Leaflet-->
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css">
                    <style>
                        .leaflet-container {
                            height: 400px;
                            width: 80%;
                            margin: 0 auto;
                        }
                    </style>
                    <script>
                        // window.__INITIAL_STATE__ = ${"JSON.stringify(initialState)"};
                    </script>
                </head>
                <body class="skin-blue sidebar-mini">
                    <div id="appRoot" class="wrapper">
                        ${"componentHTML"}
                    </div>
                    <script type="application/javascript" src="/bundle.js"></script>
                </body>
            </html>
        `)
        // }) end fetchCounter
})
/*

/*
 * Middlewares
 */
import errorsHandler  from '../api/middlewares/errorsHandler.js'
app.use(errorsHandler)

export default app