const { FindAllInvoices } = require("../models/invoiceModels");
const { BadRequestError, InternalServerError } = require("../utils/errorHandling");
const { GetCustomerByID } = require("./customerService");

exports.GetAllInvoice = async (customerID) => {
    try {
        const checkCustomer = await GetCustomerByID(customerID);
        if (!checkCustomer) throw new BadRequestError('Customer Not Found');

        const invoice = await FindAllInvoices(customerID);
        let result = [];
        invoice.forEach(item => {
            result.push({
                id: item.id,
                cartId: item.cartId,
                total_amount: item.total_amount,
                status: item.status,
                issued_at: item.issued_at
            })
        });
        return result;
    } catch (error) {
        throw new InternalServerError(`Failed Get Data ${error}`);
    }
}