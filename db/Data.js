import Thinky from 'thinky'
import { dbConfig } from '../config/rethinkdb.js'
import Vehicle from './Vehicle.js'
let thinky = Thinky(dbConfig)
let type = thinky.type
let r = thinky.r

// https://thinky.io/documentation/schemas/

let Data = thinky.createModel('Data', {
    id: type.string(),

    gpsId: type.string().required(),
    raw: type.string().required(),
    utcDatetime: type.date().required(),
    coordinate: type.point().required(),
    altitude: type.number().required(),
    speed: type.number().required(),
    curse: type.number().required(),
    vbat: type.string().required(),

    savedAt: type.date().default(r.now())
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
})
Data.ensureIndex('id')

//            (OtherModel, fieldName, leftKey, rightKey[, options]);
Data.belongsTo(Vehicle, 'vehicle', 'vehicleId', 'id')


Data.defineStatic('findDuring', (dateStart, dateEnd)=>{
    return Data
        .filter(function(data){
            return data("utcDatetime")
                .during(r.time(2016,1,13, 15,0,0, "-03:00"), r.time(2016,1,18, 16,0,0, "-03:00"))
        })
})


export default Data