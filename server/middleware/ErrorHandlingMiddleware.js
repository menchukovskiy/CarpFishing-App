const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json(
            {
                code: err.code,
                message: err.message
            }
        )
    }

    return res.status(500).json({
        code: 'UNEXPECTED_ERROR',
        message: 'Unexpected error'
    })
}