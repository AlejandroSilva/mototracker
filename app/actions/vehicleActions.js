import * as API from '../apiClient/v1.js'
export const GET_VEHICLES = 'GET_VEHICLES'
export const ADD_VEHICLE    = 'ADD_VEHICLE'
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE'
export const DELETE_VEHICLE = 'DELETE_VEHICLE'
export const ADD_VEHICLE_SOCKET = 'ADD_VEHICLE_SOCKET'
export const UPDATE_VEHICLE_SOCKET = 'UPDATE_VEHICLE_SOCKET'
export const DELETE_VEHICLE_SOCKET = 'DELETE_VEHICLE_SOCKET'

// llamado al cargar la pagina
export const getVehicles = (callback)=>{
    return (dispatch, getState)=>{
        API.vehicle.getAll()
            .then((vehicles)=>{
                dispatch({
                    type: GET_VEHICLES,
                    vehicles: vehicles
                })
                callback(null)
            })
            .catch(callback)
    }
}

// llamado desde un formulario
export const addVehicle = (vehicleFormData, callback)=> {
    return (dispatch, getState)=> {
        API.vehicle.create(vehicleFormData)
            .then((newVehicle)=>{
                callback(null, newVehicle)
                // no es necesario hacer un dispatch, ya que al crear un dato este luego llega por socket
                //dispatch({
                //    type: ADD_VEHICLE,
                //    newVehicle
                //})
            })
            .catch(callback)
    }
}
// llamado desde socket cuando se crea un vehiculo
export const addVehicleFromSocket = (newVehicle)=>{
    return {
        type: ADD_VEHICLE_SOCKET,
        newVehicle
    }
}

// llamado desde el formulario de edicion
export const updateVehicle = (updatedVehicle, callback)=>{
    return (dispatch, getState)=>{
        API.vehicle.update(updatedVehicle)
            .then((vehicle)=>{
                callback(null, vehicle)
                dispatch({
                    type: UPDATE_VEHICLE,
                    updatedVehicle
                })
            })
            .catch(callback)
    }
}
// llamado desde socket cuando llega un dato nuevo
export const updateVehicleFromSocket = (updatedVehicle)=>{
    return {
        type: UPDATE_VEHICLE_SOCKET,
        updatedVehicle
    }
}

export const deleteVehicle = (vehicleID, callback)=>{
    return (dispatch, getState)=> {
        API.vehicle.delete(vehicleID)
            .then((resp)=>{
                callback(null, resp)
                // no es necesario hacer un dispatch, al crear un dato, luego llega por socket
            })
            .catch((resp)=> {
                // si el documento estaba eliminado, de todas formas quitarlo de la lista
                if(resp.message==='Document not found'){
                    dispatch({
                        type: DELETE_VEHICLE,
                        vehicleID
                    })
                    callback(null)
                }else{
                    callback(err.message)
                }
            })
    }
}
export const deleteVehicleFromSocket = (vehicleID)=>{
    return {
        type: DELETE_VEHICLE_SOCKET,
        vehicleID
    }
}

/*
export function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState()

        if (counter % 2 === 0) {
            return
        }

        dispatch(increment())
    }
}

export function incrementAsync(delay = 1000) {
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment())
        }, delay)
    }
}
*/