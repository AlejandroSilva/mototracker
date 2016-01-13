import { environment } from './environment.js'

let config
if(environment==='development'){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_dev'
    }

}else if(environment==='production'){
        config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator'
    }

}else if(environment==='testing'){
    config = {
        host: 'localhost',
        port: 28015,
        db: 'motolocator_test'
    }

}else {
    throw new Error("[config/rehitnkdb.js] NO environment selected")
}

export const dbConfig = config