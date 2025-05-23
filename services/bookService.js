const { FindAllBooks, FindBookByID, CreateBooks, UpdateBooks, DestroyBooks } = require("../models/bookModels");
const { InternalServerError, BadRequestError } = require("../utils/errorHandling");
const { BookValidation } = require("../utils/validationHelper");

exports.GetAllBooks = async () => {
    try {
        return await FindAllBooks();
    } catch (error) {
        throw new InternalServerError(`failed get data : ${error}`);
    }
}

exports.GetBookByID = async (bookID) => {
    try {
        return await FindBookByID(bookID);
    } catch (error) {
        throw new InternalServerError(`failed get data : ${error}`);
    }
}

exports.CreateBook = async (data) => {
    try {
        await BookValidation.validate(data, { abortEarly: false });
        return await CreateBooks(data);
    } catch (error) {
        throw error;
    }
}

exports.UpdateBook = async (bookID, data) => {
    try {
        await BookValidation.validate(data, { abortEarly: false });
        const check = await this.GetBookByID(bookID);
        if (!check) throw new BadRequestError('Book Not Found');
        return await UpdateBooks(bookID, data);
    } catch (error) {
        throw error;
    }
}

exports.DeleteBook = async (bookID) => {
    try {
        const check = await this.GetBookByID(bookID);
        if (!check) throw new BadRequestError('Book Not Found');
        return await DestroyBooks(bookID);
    } catch (error) {
        throw new InternalServerError(`Delete Failed Data ${error}`);
    }
}