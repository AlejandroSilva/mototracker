import axios from 'axios'

// Documentacion: https://github.com/mzabriskie/axios

// ## Http Interceptors
axios.interceptors.request.use((config)=>{
    config.headers = {
        'Content-Type': 'application/json',
        'token': '12345'
    }
    return config
})
axios.interceptors.response.use((response)=>{
   // Si existe un problema de red, terminar la promesa
    if( response instanceof Error ){
        return Promise.reject(response.message)
    }else{
        return Promise.resolve(response.data)
    }
})

export let vehicle = {
    getAll: ()=>{
        return axios.get(`/v1/vehicle`)
    },
    update: (vehicle)=>{
        return axios.put(
            `/v1/vehicle/${vehicle.id}`,
            vehicle
        )
    },
    create: (vehicle)=>{
        // convert 'port' from number to string
        vehicle.port = ''+vehicle.port
        return axios.post(
            `/v1/vehicle/`,
            vehicle
        )
    },
    delete: (vehicleID)=>{
        return axios.delete(
            `/v1/vehicle/${vehicleID}`
        )
    }
}
