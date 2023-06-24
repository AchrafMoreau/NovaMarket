

const NotFound = async(req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errHandler = async(err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode 

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.ENV_MODE === 'development' ? err.stack : ""
    })
}

export {
    NotFound,
    errHandler
}