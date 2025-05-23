const { FindAllWarehouse, FindWarehouseByID, CreateWarehouse, UpdateWarehouse, DestroyWarehouse } = require("../models/warehouseModels");
const { InternalServerError, BadRequestError } = require("../utils/errorHandling");
const { WarehouseValidation } = require("../utils/validationHelper");

exports.GetAllWarehouse = async () => {
    try {
        return await FindAllWarehouse();
    } catch (error) {
        throw new InternalServerError(`Failed Get Data ${error}`);
    }
}

exports.GetWarehouseByID = async (warehouseID) => {
    try {
        return await FindWarehouseByID(warehouseID);
    } catch (error) {
        throw new InternalServerError(`Failed Get Data by id : ${error}`);
    }
}

exports.CreateWarehouse = async (data) => {
    try {
        await WarehouseValidation.validate(data, { abortEarly: false });
        return await CreateWarehouse(data);
    } catch (error) {
        throw error;
    }
}

exports.UpdateWarehouse = async (warehouseID, data) => {
    try {
        await WarehouseValidation.validate(data, { abortEarly: false });
        const check = await this.GetWarehouseByID(warehouseID);
        if (!check) throw new BadRequestError('Warehouse not found');
        return await UpdateWarehouse(warehouseID, data);
    } catch (error) {
        throw error;
    }
}

exports.DeleteWarehouse = async (warehouseID) => {
    try {
        const check = await this.GetWarehouseByID(warehouseID);
        if (!check) throw new BadRequestError('Warehouse not found');
        return await DestroyWarehouse(warehouseID);
    } catch (error) {
        throw new InternalServerError(`Failed Delete Data : ${error}`);
    }
}