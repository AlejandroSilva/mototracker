import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counterActions'

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export default function counter(state=0, action={}) {
    switch (action.type) {
        case SET_COUNTER:
            return action.payload
        case INCREMENT_COUNTER:
            return state + 2
        case DECREMENT_COUNTER:
            return state - 1
        default:
            return state
    }
}