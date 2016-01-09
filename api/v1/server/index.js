import express from 'express';
import * as controller from './controller.js'
import * as auth from '../../middlewares/auth.js';
import Server from '../../../db/Car.js';

let router = express.Router();

/*
 * Params
 */
router.param('serverHost', function(req, res, next, serverHost){
    // si existe el server que busca, lo agrega a la respuesta
    Server.get(serverHost).run()
    .then((server)=>{
        req.server = server;
        next();
    })
    // si no, llama a next(err), y ejecuta los middlewares de error
    .catch(next)
});

/*
 * Rutas, middlewares y controllers
 */
router.route('/')
    .get(controller.getAllServers)
    .post(auth.isAuthenticated, controller.createServer);

router.route('/:serverHost')
    .get(controller.getServer)
    .put(auth.isAuthenticated, controller.updateServer)
    .delete(auth.isAuthenticated, controller.deleteServer);

export default router;