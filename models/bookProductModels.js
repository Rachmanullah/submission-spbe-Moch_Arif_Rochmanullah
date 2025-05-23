const prisma = require("../lib/prismaClient");

exports.FindAllBookProducts = async () => {
    try {
        return await prisma.booksProduct.findMany({
            omit: {
                bookId: true,
                warehouseId: true
            },
            include: {
                book: {
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
                },
                warehouse: {
                    omit: {
                        location: true,
                        capacity: true
                    }
                }
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
            omit: {
                bookId: true,
                warehouseId: true
            },
            include: {
                book: {
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
                },
                warehouse: {
                    omit: {
                        location: true,
                        capacity: true
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindBookProductByBookID = async (bookID) => {
    try {
        return await prisma.booksProduct.findMany({
            where: { bookId: bookID },
            omit: {
                bookId: true,
                warehouseId: true
            },
            include: {
                book: {
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
                },
                warehouse: {
                    omit: {
                        location: true,
                        capacity: true
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateBookProducts = async (data) => {
    try {
        return await prisma.booksProduct.create({
            data: {
                bookId: data.bookId,
                price: parseInt(data.price),
                stock: parseInt(data.stock),
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
                bookId: data.bookId,
                price: parseInt(data.price),
                stock: parseInt(data.stock),
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