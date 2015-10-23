import express from 'express';
let router = express.Router();

/*
 * Sub Routes
 */
import server from './server'
router.use('/server', server);

export default router;