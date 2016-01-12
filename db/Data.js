import Thinky from 'thinky'
import { dbConfig } from '../config/index.js'
import Vehicle from './Vehicle.js'
let thinky = Thinky(dbConfig)
let type = thinky.type
let r = thinky.r

// https://thinky.io/documentation/schemas/

let Data = thinky.createModel('Data', {
    id: type.string(),
    vehicleID: type.string().required(),
    component: type.string().required(),
    content: type.any().required(), // puede ser un objeto o un arreglo de objetos
    createdAt: type.date().default(r.now())
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
})
Data.ensureIndex('id')

Data.belongsTo(Vehicle, 'vehicle', 'idVehicle', 'id')

export default Data