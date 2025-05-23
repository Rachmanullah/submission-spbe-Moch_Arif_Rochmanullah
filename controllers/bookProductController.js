const { GetAllBookProducts, GetBookProductByID, GetBookProductByBookID, CreateBookProduct, UpdateBookProduct, DeleteBookProduct } = require("../services/bookProductService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetAllBookProducts = async (req, res) => {
    try {
        const data = await GetAllBookProducts();
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerBookProductByID = async (req, res) => {
    try {
        const productID = req.params.productID;
        const data = await GetBookProductByID(productID);
        responseHandler.success(res, data, 'Success get data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerBookProductByBookID = async (req, res) => {
    try {
        const bookID = req.params.bookID;
        const data = await GetBookProductByBookID(bookID);
        responseHandler.success(res, data, 'Success get data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateBookProduct = async (req, res) => {
    try {
        const data = req.body;
        const created = await CreateBookProduct(data);
        responseHandler.success(res, created, 'Created Success', 201);
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

exports.HandlerUpdateBookProduct = async (req, res) => {
    try {
        const productID = req.params.productID;
        const data = req.body;
        const updated = await UpdateBookProduct(productID, data);
        responseHandler.success(res, updated, 'Update Success', 200);
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

exports.HandlerDeleteBookProduct = async (req, res) => {
    try {
        const productID = req.params.productID;
        await DeleteBookProduct(productID);
        responseHandler.success(res, null, 'Deleted Success', 200);
    } catch (error) {
        console.error('Unexpected Error:', error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}