const prisma = require("../lib/prismaClient");

exports.FindAllBooks = async () => {
    try {
        return await prisma.book.findMany({
            include: {
                author: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindBookByID = async (bookID) => {
    try {
        return await prisma.book.findFirst({
            where: { id: bookID },
            include: {
                author: true,
                booksProduct: {
                    include: {
                        warehouse: true
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateBooks = async (data) => {
    try {
        return await prisma.book.create({
            data: {
                title: data.title,
                isbn: data.isbn,
                genre: data.genre,
                publication_year: data.publication_year,
                booksProduct: {
                    createMany: {
                        data: data.products.map((item) => ({
                            price: item.price,
                            stock: item.stock,
                            format: item.format,
                            warehouseId: item.warehouseId,
                        }))
                    }
                }
            },
            include: {
                booksProduct: {
                    include: {
                        warehouse: true
                    }
                },
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateBooks = async (bookID, data) => {
    try {
        return await prisma.book.update({
            where: { id: bookID },
            data: {
                title: data.title,
                isbn: data.isbn,
                genre: data.genre,
                publication_year: data.publication_year,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyBooks = async (bookID) => {
    try {
        return await prisma.book.delete({
            where: { id: bookID },
        })
    } catch (error) {
        throw error;
    }
}