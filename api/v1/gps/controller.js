import moment from 'moment-timezone'
import * as appConfig from '../../../config/app'
import Vehicle from '../../../db/Vehicle.js'
import Data from '../../../db/Data.js'

// POST /v1/gps/:gpsID
export const saveGPS = (req, res)=>{
    // ToDo: verificar que el servidor exista

    Vehicle.filter({
        gpsId: req.gpsID
    }).limit(1).run()
    .then(vehicles=>{
        let vehicle = vehicles[0]

        if(vehicle){
            // guardar datos
            let raw = req.body.gps.trim()
            let [
                runStatus,          // 0-1
                fixStatus,          // 0-1
                utcTime,        // yyyyMMddhhmmss.sss
                lattitude,          // +- dd.dddddd
                longitude,          // +- dd.dddddd
                mslAltitude,        // meters (mean sea level)
                speedOverGround,    // Km/Hour
                curseOverGround,    // degrees [0,360.00]
                fixMode,            // 0,1,2
            ] = raw.split(',')
            let date = utcTime.substring(0,8)
            let time = utcTime.substring(8,18)

            // convert "string" to "int" some fields
            lattitude *= 1
            longitude *= 1
            mslAltitude *= 1
            speedOverGround *=1
            curseOverGround *=1
            const gpsData = {
                raw: raw,
                utcDatetime: moment(`${date}T${time}+00:00`).utc(0).format(),
                coordinate: [longitude,lattitude],
                altitude: mslAltitude,
                speed: speedOverGround,
                curse: curseOverGround,
                vbat: req.body.vbat
            }
            // guardar los datos, y actualizar la ultima posicion del vehiculo
            vehicle.lastData = gpsData
            let data = new Data({
                ...gpsData,
                gpsId: req.gpsID,
                vehicle: vehicle
            })
            data.saveAll({vehicle:true})
                .then((result)=>{
                    res.status(201).json(result)
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
            //console.log(raw, lattitude, longitude, mslAltitude, speedOverGround, curseOverGround)
        }else{
            res.status(404).json({
                error: "GPS no encontrado"
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
}