import express from 'express'
import * as controller from './controller.js'
import * as auth from '../../middlewares/auth.js'
import Server from '../../../db/Car.js'

let router = express.Router()

/*
 * Params
 */
router.param('gpsID', (req, res, next, gpsID)=>{
    req.gpsID = gpsID
    next()
})

/*
 * Rutas, middlewares y controllers
 */
//router.route('/')
//    .get(controller.getAllServers)
//    .post(auth.isAuthenticated, controller.createServer)

router.route('/:gpsID')
    //.get(controller.getServer)
    //.put(auth.isAuthenticated, controller.updateServer)
    //.delete(auth.isAuthenticated, controller.deleteServer)
    .post(controller.saveGPS)

export default router