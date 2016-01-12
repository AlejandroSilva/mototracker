function rethinkErrors(err, req, res, next){
    next(err)
}

function thinkyErrors(err, req, res, next) {
    if( /The query did not find a document/.test(err.message) ){
        res.status(404).json({
            message: 'Document not found',
            original: err.message
        })
    }else{
        next(err)
    }
}

function unhandledError(err, req, res, next){
    //throw err
    console.error(err)
    res.status(500).json({
        message: 'Unhandled error',
        original: err.message
    })
}

export default [rethinkErrors, thinkyErrors, unhandledError]