
const { FindAllCustomers, FindCustomerByID, CreateCustomers, DestroyCustomer, AuthenticateCustomer, UpdateCustomer } = require("../models/customerModels");
const { InternalServerError, BadRequestError } = require("../utils/errorHandling");
const { CustomerValidation } = require("../utils/validationHelper");
const jwt = require('jsonwebtoken');

exports.GetAllCustomer = async () => {
    try {
        return await FindAllCustomers();
    } catch (error) {
        throw new InternalServerError(`Failed Get Data ${error}`);
    }
}

exports.GetCustomerByID = async (customerID) => {
    try {
        return await FindCustomerByID(customerID);
    } catch (error) {
        throw new InternalServerError(`Failed Get Data by id : ${error}`);
    }
}

exports.CreateCustomer = async (data) => {
    try {
        await CustomerValidation.validate(data, { abortEarly: false });
        return await CreateCustomers(data);
    } catch (error) {
        throw error;
    }
}

exports.UpdateCustomer = async (customerID, data) => {
    try {
        await CustomerValidation.validate(data, { abortEarly: false });
        const check = await this.GetCustomerByID(customerID);
        if (!check) throw new BadRequestError('Customer not found');
        return await UpdateCustomer(customerID, data);
    } catch (error) {
        throw error;
    }
}

exports.DeleteCustomer = async (customerID) => {
    try {
        const check = await this.GetCustomerByID(customerID);
        if (!check) throw new BadRequestError('Customer not found');
        return await DestroyCustomer(customerID);
    } catch (error) {
        throw new InternalServerError(`Failed Delete Data : ${error}`);
    }
}

exports.authenticateCustomer = async (data) => {
    try {
        const subsetValidation = CustomerValidation.pick(['email', 'password']);
        await subsetValidation.validate(data, { abortEarly: false });

        const email = data.email;
        const password = data.password;
        const userData = await AuthenticateCustomer(email, password);

        console.log(userData);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam
        const tokenPayload = {
            userId: userData.id,
            email: userData.email,
            expiresAt,
        };

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
        );

        return token;
    } catch (error) {
        throw error;
    }
}