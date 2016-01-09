import Server from '../../../db/Car.js'

// GET /v1/server/
export function getAllServers(req, res){
    Server.run()
        .then((servers)=>{
            res.json(servers);
        })
        .catch((err)=>{
            res.status(500).json({
                error: err.message
            });
        })
}

// POST /v1/server/
export function createServer(req, res){
    let newServer = new Server(req.body);
    // un usuario no puede agregar el id manualmente
    delete newServer.id;

    newServer.save()
        .then(function(result) {
            res.json(result);
        })
        .error((err)=>{
            res.status(500).json({
                error: err.message
            })
        });
}

// GET /v1/server/:serverHost
export function getServer(req, res){
    res.json(req.server);
}

// PUT /v1/server/:serverHost
export function updateServer(req, res){
    req.server.host = req.body.host
    req.server.name = req.body.name
    req.server.port = req.body.port
    req.server.project = req.body.project
    req.server.save()
        .then(function(result) {
            res.status(200).json(result);
        })
        .error((err)=>{
            res.status(500).json({
                error: err.message
            })
        });
}

// DELETE /v1/server/:serverHost
export function deleteServer(req, res, next){
    req.server.delete()
    .then((result)=>{
        //res.json(result);
        res.status(204).send();
    })
    .catch(next);
}