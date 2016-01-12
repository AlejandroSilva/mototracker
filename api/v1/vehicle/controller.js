import Vehicle from '../../../db/Vehicle.js'

// GET /v1/vehicle/
export function getAllVehicles(req, res){
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
export function createVehicle(req, res){
    let newVehicle = new Vehicle(req.body)
    // un usuario no puede agregar el id manualmente
    delete newVehicle.id

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
export function getVehicle(req, res){
    res.json(req.vehicle)
}

// PUT /v1/vehicle/:vehicleID
export function updateVehicle(req, res){
    req.vehicle.name = req.body.name
    req.vehicle.licenceID = req.body.licenceID
    req.vehicle.model = req.body.model
    req.vehicle.maker = req.body.maker
    req.vehicle.gpsID = req.body.gpsID
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
export function deleteVehicle(req, res, next){
    req.vehicle.delete()
    .then((result)=>{
        //res.json(result)
        res.status(204).send()
    })
    .catch(next)
}
