const prisma = require("../lib/prismaClient");

exports.FindAllInvoices = async (customerId) => {
    try {
        return await prisma.invoice.findMany({
            where: {
                customerId: customerId
            },
            include: {
                cart: true
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindInvoiceByID = async (invoiceID) => {
    try {
        return await prisma.invoice.findFirst({
            where: { id: invoiceID },
            include: {
                cart: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindInvoiceByCartID = async (cartID) => {
    try {
        return await prisma.invoice.findFirst({
            where: { cartId: cartID },
            include: {
                cart: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateInvoice = async (data) => {
    try {
        return await prisma.invoice.create({
            data: {
                customerId: data.customerId,
                cartId: data.cartId,
                issued_at: data.issued_at,
                status: data.status,
                total_amount: data.total_amount,
                items: {
                    create: data.itemsCart.map((item) => ({
                        price: parseInt(item.price),
                        quantity: parseInt(item.quantity),
                        booksProductId: item.booksProductId,
                    }))
                }
            },
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateInvoice = async (invoiceID, data) => {
    try {
        return await prisma.invoice.update({
            where: { id: invoiceID },
            data: {
                customerId: data.customerId,
                cartId: data.cartId,
                issued_at: data.issued_at,
                status: data.status,
                total_amount: data.total_amount,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyInvoice = async (invoiceID) => {
    try {
        return await prisma.invoice.delete({
            where: { id: invoiceID },
        })
    } catch (error) {
        throw error;
    }
}