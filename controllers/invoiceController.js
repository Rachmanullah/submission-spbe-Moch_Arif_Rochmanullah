const { GetAllInvoice } = require("../services/invoiceService");
const responseHandler = require("../utils/responseHelper");

exports.HandlerGetInvoice = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await GetAllInvoice(userId);
        responseHandler.success(res, data, 'Success Get Data', 200);
    } catch (error) {
        console.log(error)
        if (error.statusCode === 400) {
            responseHandler.error(res, error.message, 400);
        }
        responseHandler.error(res, 'Internal Server Error', 500);
    }
}