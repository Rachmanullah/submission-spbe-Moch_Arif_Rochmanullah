const { GetAllCustomer, GetCustomerByID, CreateCustomer, UpdateCustomer, DeleteCustomer } = require("../services/customerService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetAllCustomer = async (req, res) => {
    try {
        const data = await GetAllCustomer();
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCustomerByID = async (req, res) => {
    try {
        const customerID = req.params.customerID;
        const data = await GetCustomerByID(customerID);
        responseHandler.success(res, data, 'Success get data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateCustomer = async (req, res) => {
    try {
        const data = req.body;
        const created = await CreateCustomer(data);
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

exports.HandlerUpdateCustomer = async (req, res) => {
    try {
        const customerID = req.params.customerID;
        const data = req.body;
        const updated = await UpdateCustomer(customerID, data);
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

exports.HandlerDeleteCustomer = async (req, res) => {
    try {
        const customerID = req.params.customerID;
        await DeleteCustomer(customerID);
        responseHandler.success(res, null, 'Deleted Success', 200);
    } catch (error) {
        console.error('Unexpected Error:', error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}