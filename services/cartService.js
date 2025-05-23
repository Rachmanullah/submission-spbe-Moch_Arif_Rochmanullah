const { CreateCartItem, FindCartItemByCartID } = require("../models/cartItemModels");
const { FindCartByCustomerID, CreateCart } = require("../models/cartModels");
const { CreateInvoice } = require("../models/invoiceModels");
const { BadRequestError, InternalServerError } = require("../utils/errorHandling");
const { ItemCartValidation } = require("../utils/validationHelper");
const { GetCustomerByID } = require("./customerService");

exports.GetCart = async (customerID) => {
    try {
        const checkCustomer = await GetCustomerByID(customerID);
        if (!checkCustomer) throw new BadRequestError('Customer Not Found');

        const cart = await FindCartByCustomerID(customerID);
        console.log(cart)
        return cart;
    } catch (error) {
        throw new InternalServerError(`Failed Get Data ${error}`);
    }
}

exports.CreateItemCart = async (customerID, data) => {
    try {
        const checkCustomer = await GetCustomerByID(customerID);
        if (!checkCustomer) throw new BadRequestError('Customer Not Found');
        await ItemCartValidation.validate(data, { abortEarly: false });
        const cart = await FindCartByCustomerID(customerID);
        let formData = [];
        data.forEach(item => {
            formData.push({
                cartId: cart.id,
                quantity: item.quantity,
                booksProductId: item.booksProductId,
            })
        });
        await CreateCartItem(formData);
        const result = await FindCartItemByCartID(cart.id)
        return result;
    } catch (error) {
        throw error;
    }
}

exports.CheckOut = async (customerID) => {
    try {
        const checkCustomer = await GetCustomerByID(customerID);
        if (!checkCustomer) throw new BadRequestError('Customer Not Found');

        const cart = await FindCartByCustomerID(customerID);
        if (!cart || cart.items.length === 0) {
            throw new BadRequestError('Cart is empty or not found');
        }

        const totalAmount = cart.items.reduce((total, item) => {
            const price = item.products.price;
            const quantity = item.quantity;
            return total + (price * quantity);
        }, 0);

        const formData = {
            customerId: customerID,
            cartId: cart.id,
            issued_at: new Date(),
            status: "Pending",
            total_amount: totalAmount,
            itemsCart: cart.items.map((item) => ({
                price: item.products.price,
                quantity: item.quantity,
                booksProductId: item.booksProductId,
            }))
        }

        const createInvoice = await CreateInvoice(formData);
        await CreateCart(customerID);
        const formatResult = {
            invoiceId: createInvoice.id,
            status: createInvoice.status,
            total_amount: createInvoice.total_amount,
            issued_at: createInvoice.issued_at
        }
        return formatResult;
    } catch (error) {
        throw error;
    }
}