const { GetAllBooks, GetBookByID, CreateBook, UpdateBook, DeleteBook } = require("../services/bookService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetAllBooks = async (req, res) => {
    try {
        const data = await GetAllBooks();
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerBookByID = async (req, res) => {
    try {
        const bookID = req.params.bookID;
        const data = await GetBookByID(bookID);
        responseHandler.success(res, data, 'Success get data', 200);
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateBook = async (req, res) => {
    try {
        const data = req.body;
        const created = await CreateBook(data);
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

exports.HandlerUpdateBook = async (req, res) => {
    try {
        const bookID = req.params.bookID;
        const data = req.body;
        const updated = await UpdateBook(bookID, data);
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

exports.HandlerDeleteBook = async (req, res) => {
    try {
        const bookID = req.params.bookID;
        await DeleteBook(bookID);
        responseHandler.success(res, null, 'Deleted Success', 200);
    } catch (error) {
        console.error('Unexpected Error:', error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}