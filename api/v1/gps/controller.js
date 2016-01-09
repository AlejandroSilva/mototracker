import Server from '../../../db/Car.js'

// POST /v1/gps/:gpsID
export function saveGPS(req, res){
    console.log({
        gpsID: req.gpsID,
        body: req.body,
        params: req.params

    })
    res.send('ok')
}