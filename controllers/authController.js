const { CreateCustomer, authenticateCustomer } = require("../services/customerService");
const jwt = require('jsonwebtoken');
const responseHandler = require("../utils/responseHelper");

exports.HandlerRegister = async (req, res) => {
    try {
        const data = req.body;
        const created = await CreateCustomer(data);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam
        const tokenPayload = {
            userId: created.id,
            email: created.email,
            expiresAt,
        };

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
        );

        responseHandler.success(res, token, 'Register Success', 201);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.assign(validationErrors, error.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                return acc;
            }, {}));
            console.error('Validation Errors:', validationErrors);
            responseHandler.error(res, validationErrors, 400);
        } else if (error.statusCode === 400) {
            responseHandler.error(res, error.message, 400);
        } else {
            console.error('Unexpected Error:', error);
            responseHandler.error(res, 'Internal Server Error', 500);
        }
    }
}

exports.HandlerAuthenticateCustomer = async (req, res) => {
    try {
        const data = req.body;
        const customer = await authenticateCustomer(data);
        return responseHandler.success(res, customer, 'Authentication successfully', 200);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.assign(validationErrors, error.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                return acc;
            }, {}));
            console.error('Validation Errors:', validationErrors);
            return responseHandler.error(res, validationErrors, 400);
        } else {
            console.error('Unexpected Error:', error);
            responseHandler.error(res, 'Internal Server Error', 500);
        }
    }
}