const responseHandler = {
    success: (res, data, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            status: 'true',
            code: statusCode,
            message,
            data,
        });
    },
    error: (res, message = 'Error', statusCode = 400) => {
        return res.status(statusCode).json({
            status: 'false',
            code: statusCode,
            message,
        });
    },
    forbidden: (res, errors = 'Token Required', statusCode = 403) => {
        return res.status(statusCode).json({
            errors,
        });
    },
};

module.exports = responseHandler;