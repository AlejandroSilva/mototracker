import * as serverAction from '../actions/serversActions.js';

let defaultState = {
    list: []
}
export let serversDefaultState = defaultState

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export let serversReducer = (state=defaultState, action={})=>{
    switch (action.type) {
        case serverAction.GET_SERVERS:
            return Object.assign({}, state, {
                list: action.servers
            })
            break

        case serverAction.ADD_SERVER:
        case serverAction.ADD_SERVER_SOCKET:
            // agregar el nuevo servido a una copia de la lista
            let list__add = state.list.slice()
            list__add.push(action.newServer)
            // crear un nuevo estado con la nueva lista
            return Object.assign({}, state, {
                list: list__add
            })
        break

        // el mismo resultado, para dos acciones "iguales"
        case serverAction.UPDATE_SERVER:
        case serverAction.UPDATE_SERVER_SOCKET:
            // buscar el servidor y reemplazar sus datos
            let list__update = state.list.map((server)=>{
                if(server.id===action.updatedServer.id){
                    return action.updatedServer
                }else{
                    return server
                }
            })
            return Object.assign({}, state, {
                list: list__update
            })
        break

        case serverAction.DELETE_SERVER:
        case serverAction.DELETE_SERVER_SOCKET:
            // quitar de la lista el servidor eliminado
            const list__delete = state.list.filter(server=>{
                return server.id!==action.serverID
            })
            return Object.assign({}, state, {
                list: list__delete
            })
        break

        default:
            return state;
    }
}