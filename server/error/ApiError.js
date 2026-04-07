class ApiError extends Error {
    constructor(status, code, message) {
        super(message)
        this.status = status
        this.code = code
    }

    static invalidData(code, message) {
        return new ApiError(400, code, message)
    }

    static forbiden(message) {
        return new ApiError(403, 'FORBIDEN', message)
    }

    static badRequest(message) {
        return new ApiError(404, 'BAD_REQUEST', message)
    }

    static internal(message) {
        return new ApiError(500, 'INERNAL', message)
    }


}

module.exports = ApiError