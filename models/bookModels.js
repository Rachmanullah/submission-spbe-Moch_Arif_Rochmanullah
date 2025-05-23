const prisma = require("../lib/prismaClient");

exports.FindAllBooks = async () => {
    try {
        return await prisma.book.findMany({
            omit: {
                authorId: true
            },
            include: {
                author: {
                    omit: {
                        bio: true,
                        birthdate: true
                    }
                }
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
            omit: {
                authorId: true
            },
            include: {
                author: {
                    omit: {
                        bio: true,
                        birthdate: true
                    }
                },
                products: {
                    omit: {
                        warehouseId: true,
                        bookId: true
                    },
                    include: {
                        warehouse: {
                            omit: {
                                location: true,
                                capacity: true,
                            }
                        }
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
                authorId: data.authorId,
                title: data.title,
                isbn: data.isbn,
                genre: data.genre,
                publication_year: data.publication_year,
                products: {
                    createMany: {
                        data: data.products?.map((item) => ({
                            price: parseInt(item.price),
                            stock: parseInt(item.stock),
                            format: item.format,
                            warehouseId: item.warehouseId,
                        }))
                    }
                }
            },
            include: {
                products: {
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
                authorId: data.authorId,
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