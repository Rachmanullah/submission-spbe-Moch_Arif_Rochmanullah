const prisma = require("../lib/prismaClient");

exports.FindAllBookProducts = async () => {
    try {
        return await prisma.booksProduct.findMany({
            include: {
                book: {
                    include: {
                        author: true
                    }
                },
                warehouse: true
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindBookProductByID = async (productID) => {
    try {
        return await prisma.booksProduct.findFirst({
            where: { id: productID },
            book: {
                include: {
                    author: true
                }
            },
            warehouse: true
        })
    } catch (error) {
        throw error;
    }
}

exports.FindBookProductByBookID = async (bookID) => {
    try {
        return await prisma.booksProduct.findMany({
            where: { bookId: bookID },
            book: {
                include: {
                    author: true
                }
            },
            warehouse: true
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateBookProducts = async (data) => {
    try {
        return await prisma.booksProduct.create({
            data: {
                price: data.price,
                stock: data.stock,
                format: data.format,
                warehouseId: data.warehouseId,
            },
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateBookProducts = async (productID, data) => {
    try {
        return await prisma.booksProduct.update({
            where: { id: productID },
            data: {
                price: data.price,
                stock: data.stock,
                format: data.format,
                warehouseId: data.warehouseId,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyBookProducts = async (productID) => {
    try {
        return await prisma.booksProduct.delete({
            where: { id: productID },
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyBookProductsByBookID = async (bookID) => {
    try {
        return await prisma.booksProduct.deleteMany({
            where: { bookId: bookID },
        })
    } catch (error) {
        throw error;
    }
}