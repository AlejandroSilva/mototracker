import * as API from '../apiClient/v1.js'
export const GET_SERVERS = 'GET_SERVERS'
export const ADD_SERVER    = 'ADD_SERVER'
export const UPDATE_SERVER = 'UPDATE_SERVER'
export const DELETE_SERVER = 'DELETE_SERVER'
export const ADD_SERVER_SOCKET = 'ADD_SERVER_SOCKET'
export const UPDATE_SERVER_SOCKET = 'UPDATE_SERVER_SOCKET'
export const DELETE_SERVER_SOCKET = 'DELETE_SERVER_SOCKET'

// llamado al cargar la pagina
export const getServers = (callback)=>{
    return (dispatch, getState)=>{
        API.server.getAll()
            .then((servers)=>{
                dispatch({
                    type: GET_SERVERS,
                    servers: servers
                })
                callback(null)
            })
            .catch(callback)
    }
}

// llamado desde un formulario
export const addServer = (serverForm, callback)=> {
    return (dispatch, getState)=> {
        API.server.create(serverForm)
            .then((newServer)=>{
                callback(null, newServer)
                // no es necesario hacer un dispatch, al crear un dato, luego llega por socket
                //dispatch({
                //    type: ADD_SERVER,
                //    newServer
                //})
            })
            .catch(callback)
    }
}
// llamado desde socket cuando se crea un servidor
export const addServerFromSocket = (newServer)=>{
    return {
        type: ADD_SERVER_SOCKET,
        newServer
    }
}

// llamado desde el formulario de edicion
export const updateServer = (updatedServer, callback)=>{
    return (dispatch, getState)=>{
        API.server.update(updatedServer)
            .then((server)=>{
                callback(null, server)
                dispatch({
                    type: UPDATE_SERVER,
                    updatedServer
                })
            })
            .catch(callback)
    }
}
// llamado desde socket cuando llega un dato nuevo
export const updateServerFromSocket = (updatedServer)=>{
    return {
        type: UPDATE_SERVER_SOCKET,
        updatedServer
    };
}

export const deleteServer = (serverID, callback)=>{
    return (dispatch, getState)=> {
        API.server.delete(serverID)
            .then((resp)=>{
                callback(null, resp)
                // no es necesario hacer un dispatch, al crear un dato, luego llega por socket
            })
            .catch((resp)=> {
                // si el documento estaba eliminado, de todas formas quitarlo de la lista
                if(resp.message==='Document not found'){
                    dispatch({
                        type: DELETE_SERVER,
                        serverID
                    })
                    callback(null)
                }else{
                    callback(err.message)
                }
            })
    }
}
export const deleteServerFromSocket = (serverID)=>{
    return {
        type: DELETE_SERVER_SOCKET,
        serverID
    };
}

/*
export function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

export function incrementAsync(delay = 1000) {
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment());
        }, delay);
    };
}
*/