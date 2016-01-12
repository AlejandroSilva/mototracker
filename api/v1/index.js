import express from 'express'
let router = express.Router()

/*
 * Sub Routes
 */
import vehicle from './vehicle'
router.use('/vehicle', vehicle)

import gps from './gps'
router.use('/gps', gps)

export default router