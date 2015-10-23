import Thinky from 'thinky';
import { dbConfig } from '../config/index.js';
let thinky = Thinky(dbConfig);
let type = thinky.type;

// https://thinky.io/documentation/schemas/

let User = thinky.createModel('User', {
    id: type.string(),
    name: type.string().required()
},{
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
});
User.ensureIndex('id');

export default User;