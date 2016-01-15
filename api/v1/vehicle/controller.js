import Vehicle from '../../../db/Vehicle.js'

// GET /v1/vehicle/
export const getAllVehicles = (req, res)=>{
    Vehicle.run()
        .then((vehicles)=>{
            res.json(vehicles)
        })
        .catch((err)=>{
            res.status(500).json({
                error: err.message
            })
        })
}

// POST /v1/vehicle/
export const createVehicle = (req, res)=>{
    //ToDo: el gpsId no puede estar repetido
    let newVehicle = new Vehicle(req.body)
    // un usuario no puede agregar el id manualmente
    delete newVehicle.id
    newVehicle.lastData = {}

    newVehicle.save()
        .then(function(result) {
            res.json(result)
        })
        .error((err)=>{
            res.status(500).json({
                error: err.message
            })
        })
}

// GET /v1/vehicle/:vehicleID
export const getVehicle = (req, res)=>{
    res.json(req.vehicle)
}

// PUT /v1/vehicle/:vehicleID
export const updateVehicle = (req, res)=>{
    // Todo: no se puede cambiar el id ni el gpsId
    req.vehicle.name = req.body.name
    req.vehicle.licenceId = req.body.licenceId
    req.vehicle.model = req.body.model
    req.vehicle.maker = req.body.maker
    req.vehicle.gpsId = req.body.gpsId
    req.vehicle.save()
        .then(function(result) {
            res.status(200).json(result)
        })
        .error((err)=>{
            res.status(500).json({
                error: err.message
            })
        })
}

// DELETE /v1/vehicle/:vehicleID
export const deleteVehicle = (req, res, next)=>{
    req.vehicle.delete()
    .then((result)=>{
        //res.json(result)
        res.status(204).send()
    })
    .catch(next)
}
