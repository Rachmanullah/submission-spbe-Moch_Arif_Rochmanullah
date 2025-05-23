const { FindBookByID } = require("../models/bookModels");
const { FindAllBookProducts, FindBookProductByID, FindBookProductByBookID, CreateBookProducts, UpdateBookProducts, DestroyBookProducts } = require("../models/bookProductModels");
const { FindWarehouseByID } = require("../models/warehouseModels");
const { InternalServerError, BadRequestError } = require("../utils/errorHandling");
const { BookProductValidation } = require("../utils/validationHelper");


exports.GetAllBookProducts = async () => {
    try {
        return await FindAllBookProducts();
    } catch (error) {
        throw new InternalServerError(`failed get data : ${error}`);
    }
}

exports.GetBookProductByID = async (itemID) => {
    try {
        return await FindBookProductByID(itemID);
    } catch (error) {
        throw new InternalServerError(`failed get data : ${error}`);
    }
}

exports.GetBookProductByBookID = async (bookID) => {
    try {
        const check = await FindBookByID(bookID);
        if (!check) throw new BadRequestError('Book Not Found');

        return await FindBookProductByBookID(bookID);
    } catch (error) {
        throw new InternalServerError(`failed get data : ${error}`);
    }
}

exports.CreateBookProduct = async (data) => {
    try {
        await BookProductValidation.validate(data, { abortEarly: false });

        const checkBook = await FindBookByID(data.bookId);
        if (!checkBook) throw new BadRequestError('BookId Not Found');

        const checkWarehouse = await FindWarehouseByID(data.warehouseId);
        if (!checkWarehouse) throw new BadRequestError('warehouseId Not Found');

        return await CreateBookProducts(data);
    } catch (error) {
        throw error;
    }
}

exports.UpdateBookProduct = async (itemID, data) => {
    try {
        await BookProductValidation.validate(data, { abortEarly: false });

        const check = await this.GetBookProductByID(itemID);
        if (!check) throw new BadRequestError('Book Product Not Found');

        const checkBook = await FindBookByID(data.bookId);
        if (!checkBook) throw new BadRequestError('BookId Not Found');

        const checkWarehouse = await FindWarehouseByID(data.warehouseId);
        if (!checkWarehouse) throw new BadRequestError('warehouseId Not Found');

        return await UpdateBookProducts(itemID, data);
    } catch (error) {
        throw error;
    }
}

exports.DeleteBookProduct = async (itemID) => {
    try {
        const check = await this.GetBookProductByID(itemID);
        if (!check) throw new BadRequestError('Book Product Not Found');
        return await DestroyBookProducts(itemID);
    } catch (error) {
        throw new InternalServerError('Delete Failed Data');
    }
}