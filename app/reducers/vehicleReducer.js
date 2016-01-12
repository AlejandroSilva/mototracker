import * as vehicleActions from '../actions/vehicleActions.js'

let defaultState = {
    list: []
}
export let vehicleDefaultState = defaultState

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export let vehicleReducer = (state=defaultState, action={})=>{
    switch (action.type) {
        case vehicleActions.GET_VEHICLES:
            return Object.assign({}, state, {
                list: action.vehicles
            })
            break

        case vehicleActions.ADD_VEHICLE:
        case vehicleActions.ADD_VEHICLE_SOCKET:
            // agregar el nuevo servido a una copia de la lista
            let list__add = state.list.slice()
            list__add.push(action.newVehicle)
            // crear un nuevo estado con la nueva lista
            return Object.assign({}, state, {
                list: list__add
            })
        break

        // el mismo resultado, para dos acciones "iguales"
        case vehicleActions.UPDATE_VEHICLE:
        case vehicleActions.UPDATE_VEHICLE_SOCKET:
            // buscar el servidor y reemplazar sus datos
            let list__update = state.list.map((vehicle)=>{
                if(vehicle.id===action.updatedVehicle.id){
                    return action.updatedVehicle
                }else{
                    return vehicle
                }
            })
            return Object.assign({}, state, {
                list: list__update
            })
        break

        case vehicleActions.DELETE_VEHICLE:
        case vehicleActions.DELETE_VEHICLE_SOCKET:
            // quitar de la lista el servidor eliminado
            const list__delete = state.list.filter(vehicle=>{
                return vehicle.id!==action.vehicleID
            })
            return Object.assign({}, state, {
                list: list__delete
            })
        break

        default:
            return state
    }
}