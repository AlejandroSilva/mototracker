import express from 'express'
import * as controller from './controller.js'
import * as auth from '../../middlewares/auth.js'
import Vehicle from '../../../db/Vehicle.js'

let router = express.Router()

/*
 * Params
 */
router.param('vehicleID', function(req, res, next, vehicleID){
    // si existe el vehicle que busca, lo agrega a la respuesta
    Vehicle.get(vehicleID).run()
    .then((vehicle)=>{
        req.vehicle = vehicle
        next()
    })
    // si no, llama a next(err), y ejecuta los middlewares de error
    .catch(next)
})

/*
 * Rutas, middlewares y controllers
 */
router.route('/')
    .get(controller.getAllVehicles)
    .post(auth.isAuthenticated, controller.createVehicle)

router.route('/:vehicleID')
    .get(controller.getVehicle)
    .put(auth.isAuthenticated, controller.updateVehicle)
    .delete(auth.isAuthenticated, controller.deleteVehicle)

export default router