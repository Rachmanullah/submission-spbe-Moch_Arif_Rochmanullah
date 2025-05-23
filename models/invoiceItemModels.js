const prisma = require("../lib/prismaClient");

exports.FindAllInvoiceItems = async () => {
    try {
        return await prisma.invoiceItem.findMany({
            include: {
                booksProduct: {
                    include: {
                        book: {
                            select: {
                                title: true
                            }
                        },
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindInvoiceItemByID = async (itemID) => {
    try {
        return await prisma.invoiceItem.findFirst({
            where: { id: itemID },
            include: {
                booksProduct: {
                    include: {
                        book: {
                            select: {
                                title: true
                            }
                        },
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindInvoiceItemByInvoiceID = async (invoiceID) => {
    try {
        return await prisma.invoiceItem.findFirst({
            where: { invoiceId: invoiceID },
            include: {
                booksProduct: {
                    include: {
                        book: {
                            select: {
                                title: true
                            }
                        },
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateInvoiceItem = async (data) => {
    try {
        return await prisma.invoiceItem.create({
            data: {
                price: parseInt(data.price),
                quantity: parseInt(data.quantity),
                booksProductId: data.booksProductId,
                invoiceId: data.invoiceId
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateInvoiceItem = async (itemID, data) => {
    try {
        return await prisma.invoiceItem.update({
            where: { id: itemID },
            data: {
                price: parseInt(data.price),
                quantity: parseInt(data.quantity),
                booksProductId: data.booksProductId,
                invoiceId: data.invoiceId
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyInvoiceItem = async (itemID) => {
    try {
        return await prisma.invoiceItem.delete({
            where: { id: itemID },
        })
    } catch (error) {
        throw error;
    }
}