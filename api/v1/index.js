import express from 'express'
let router = express.Router()

/*
 * Sub Routes
 */
import server from './server'
router.use('/server', server)

import gps from './gps'
router.use('/gps', gps)

export default router