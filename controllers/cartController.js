const { GetCart, CreateItemCart, CheckOut } = require("../services/cartService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetCartByCustomerID = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await GetCart(userId);
        responseHandler.success(res, cart, 'Success Get Data', 200);
    } catch (error) {
        console.log(error)
        if (error.statusCode === 400) {
            responseHandler.error(res, error.message, 400);
        }
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateItemCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = req.body;
        const created = await CreateItemCart(userId, data);
        responseHandler.success(res, created, 'Created Data', 201);
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


exports.HandlerCheckout = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await CheckOut(userId);
        responseHandler.success(res, data, 'Checkout Success', 200);
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