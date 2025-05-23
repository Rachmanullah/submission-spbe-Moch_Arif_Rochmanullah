const { GetAllWarehouse, GetWarehouseByID, CreateWarehouse, UpdateWarehouse, DeleteWarehouse } = require("../services/warehouseService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetAllWarehouse = async (req, res) => {
    try {
        const data = await GetAllWarehouse();
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerWarehouseByID = async (req, res) => {
    try {
        const warehouseID = req.params.warehouseID;
        const data = await GetWarehouseByID(warehouseID);
        responseHandler.success(res, data, 'Success get data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateWarehouse = async (req, res) => {
    try {
        const data = req.body;
        const created = await CreateWarehouse(data);
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

exports.HandlerUpdateWarehouse = async (req, res) => {
    try {
        const warehouseID = req.params.warehouseID;
        const data = req.body;
        const updated = await UpdateWarehouse(warehouseID, data);
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

exports.HandlerDeleteWarehouse = async (req, res) => {
    try {
        const warehouseID = req.params.warehouseID;
        await DeleteWarehouse(warehouseID);
        responseHandler.success(res, null, 'Deleted Success', 200);
    } catch (error) {
        console.error('Unexpected Error:', error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}