import Thinky from 'thinky'
import { dbConfig } from '../config/rethinkdb.js'
let thinky = Thinky(dbConfig)
let type = thinky.type
let r = thinky.r
// https://thinky.io/documentation/schemas/

let Vehicle = thinky.createModel('Vehicle', {
    id: type.string(),
    name: type.string().required(),
    licenceId: type.string().required(),    // patente
    model: type.string().required(),
    maker: type.string().required(),        // marca
    gpsId: type.string().required(),        // identificador del GPS

    lastData: type.any().required(), // puede ser un objeto o un arreglo de objetos

    updatedAt: type.date().default(r.now()),
    createdAt: type.date().default(r.now()),
    status: type.array().default([])
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
})
Vehicle.ensureIndex('id')
Vehicle.pre('save', function(next){
    // al guardar, actualizar la fecha
    this.updatedAt = r.now()
    next()
})

export default Vehicle