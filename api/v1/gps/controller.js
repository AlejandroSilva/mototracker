import Server from '../../../db/Server.js'

// POST /v1/gps/:gpsID
export function saveGPS(req, res){
    console.log({
        gpsID: req.gpsID,
        body: req.body
    })
}