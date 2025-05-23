const prisma = require("../lib/prismaClient");

exports.FindAllCartItems = async () => {
    try {
        return await prisma.cartItem.findMany({
            include: {
                cart: {
                    include: {
                        customer: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
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

exports.FindCartItemByID = async (itemID) => {
    try {
        return await prisma.cartItem.findFirst({
            where: { id: itemID },
            include: {
                cart: {
                    include: {
                        customer: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
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

exports.FindCartItemByCartID = async (CartID) => {
    try {
        return await prisma.cartItem.findMany({
            where: { cartId: CartID },
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateCartItem = async (data) => {
    try {
        return await prisma.cartItem.createMany({
            data: data.map((item) => ({
                quantity: item.quantity,
                booksProductId: item.booksProductId,
                cartId: item.cartId
            })),
            skipDuplicates: true,
        });
    } catch (error) {
        throw error;
    }
}

exports.UpdateCartItem = async (itemID, data) => {
    try {
        return await prisma.cartItem.update({
            where: { id: itemID },
            data: {
                quantity: data.quantity,
                booksProductId: data.booksProductId,
                cartId: data.cartId
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyCartItem = async (itemID) => {
    try {
        return await prisma.cartItem.delete({
            where: { id: itemID },
        })
    } catch (error) {
        throw error;
    }
}