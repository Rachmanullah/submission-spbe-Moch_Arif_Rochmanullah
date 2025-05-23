const prisma = require("../lib/prismaClient");

exports.FindCartByCustomerID = async (customerID) => {
    try {
        return await prisma.cart.findFirst({
            where: {
                AND: [
                    { customerId: customerID },
                    { invoice: null }
                ]
            },
            include: {
                items: {
                    include: {
                        products: {
                            select: {
                                price: true,
                                format: true,
                                book: {
                                    select: {
                                        title: true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateCart = async (customerId) => {
    try {
        return await prisma.cart.create({
            data: {
                customerId: customerId,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyCart = async (cartID) => {
    try {
        return await prisma.cart.delete({
            where: { id: cartID },
        })
    } catch (error) {
        throw error;
    }
}