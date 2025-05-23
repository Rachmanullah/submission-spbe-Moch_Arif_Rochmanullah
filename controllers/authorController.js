const { GetAllAuthors, GetAuthorByID, CreateAuthor, UpdateAuthor, DeleteAuthor } = require("../services/authorService");
const responseHandler = require("../utils/responseHelper");
exports.HandlerGetAllAuthor = async (req, res) => {
    try {
        const data = await GetAllAuthors()
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.error(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerAuthorByID = async (req, res) => {
    try {
        const authorID = req.params.authorID;
        const data = await GetAuthorByID(authorID);
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.error(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}

exports.HandlerCreateAuthor = async (req, res) => {
    try {
        const data = req.body;
        const create = await CreateAuthor(data);
        responseHandler.success(res, create, 'Success Create Data', 201);
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

exports.HandlerUpdateAuthor = async (req, res) => {
    try {
        const authorID = req.params.authorID;
        const data = req.body;
        const updatedData = await UpdateAuthor(authorID, data);
        responseHandler.success(res, updatedData, 'Success Update Data', 200);
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

exports.HandlerDeleteAuthor = async (req, res) => {
    try {
        const authorID = req.params.authorID;
        await DeleteAuthor(authorID);
        responseHandler.success(res, null, 'Success Delete Data', 200);
    } catch (error) {
        console.error(error);
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}