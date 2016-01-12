import express from 'express'
import * as controller from './controller.js'
import * as auth from '../../middlewares/auth.js'
import Vehicle from '../../../db/Vehicle.js'

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
//    .get(controller.getAllVehicles)
//    .post(auth.isAuthenticated, controller.createVehicle)

router.route('/:gpsID')
    //.get(controller.getVehicle)
    //.put(auth.isAuthenticated, controller.updateVehicle)
    //.delete(auth.isAuthenticated, controller.deleteVehicle)
    .post(controller.saveGPS)

export default router