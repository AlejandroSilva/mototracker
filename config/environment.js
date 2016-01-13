const NODE_ENV = process.env.NODE_ENV
// verificamos que las variables globales sean validas
export const environment = (NODE_ENV==='production' || NODE_ENV==='testing')? NODE_ENV: 'development'
