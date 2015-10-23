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

export let server = {
    getAll: ()=>{
        return axios.get(`/v1/server`)
    },
    update: (server)=>{
        return axios.put(
            `/v1/server/${server.id}`,
            server
        )
    },
    create: (server)=>{
        // convert 'port' from number to string
        server.port = ''+server.port
        return axios.post(
            `/v1/server/`,
            server
        )
    },
    delete: (serverID)=>{
        return axios.delete(
            `/v1/server/${serverID}`
        )
    }
}
