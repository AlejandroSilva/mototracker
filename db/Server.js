import Thinky from 'thinky';
import { dbConfig } from '../config/index.js';
let thinky = Thinky(dbConfig);
let type = thinky.type;
let r = thinky.r;
// https://thinky.io/documentation/schemas/

let Server = thinky.createModel('Server', {
    id: type.string(),
    name: type.string().required(),
    project: type.string().required(),
    currentData: type.any().required(), // puede ser un objeto o un arreglo de objetos
    updatedAt: type.date().default(r.now()),
    createdAt: type.date().default(r.now()),
    status: type.array().default([]),
    host: type.string().required(),
    port: type.string().required()
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
});
Server.ensureIndex('id');
Server.pre('save', function(next){
    // al guardar, actualizar la fecha
    this.updatedAt = r.now();
    next()
});

export default Server;