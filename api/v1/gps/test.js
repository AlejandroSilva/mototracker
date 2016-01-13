import moment from 'moment-timezone'

let raw = "1,1,20160113180826.000,-34.965898,-71.243217,199.900,0.11,143.4,1,,1.0,1.3,0.9,,9,8,,,39,,"
var [
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

let obj = {
    1: moment(`${date}T${time}+00:00`).utc(0).format(),
    2: moment.tz(`${date}T${time}+00:00`, 'America/Santiago').format(),
    // 2014-04-20T06:32:18.616Z
}
console.log(obj)
