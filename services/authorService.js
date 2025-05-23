const { FindAllAuthors, FindAuthorByID, CreateAuthor, UpdateAuthor, DestroyAuthor } = require("../models/authorModels");
const { InternalServerError, BadRequestError } = require("../utils/errorHandling");
const { AuthorValidation } = require("../utils/validationHelper");

exports.GetAllAuthors = async () => {
    try {
        return await FindAllAuthors();
    } catch (error) {
        throw new InternalServerError(`Failed Get Data: ${error.message}`);
    }
}

exports.GetAuthorByID = async (authorID) => {
    try {
        return await FindAuthorByID(authorID)
    } catch (error) {
        throw new InternalServerError(`Failed Get Data: ${error.message}`);
    }
}

exports.CreateAuthor = async (data) => {
    try {
        await AuthorValidation.validate(data, { abortEarly: false });
        return await CreateAuthor(data);
    } catch (error) {
        throw error;
    }
}

exports.UpdateAuthor = async (authorID, data) => {
    try {
        await AuthorValidation.validate(data, { abortEarly: false });
        const check = await this.GetAuthorByID(authorID);
        if (!check) throw new BadRequestError('Author Not Found');
        return await UpdateAuthor(authorID, data);
    } catch (error) {
        throw error;
    }
}

exports.DeleteAuthor = async (authorID) => {
    try {
        const check = await this.GetAuthorByID(authorID);
        if (!check) throw new BadRequestError('Author Not Found');
        return await DestroyAuthor(authorID);
    } catch (error) {
        throw new InternalServerError(`failed delete data : ${error}`)
    }
}

