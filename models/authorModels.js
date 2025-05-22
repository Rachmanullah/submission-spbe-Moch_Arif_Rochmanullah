const prisma = require("../lib/prismaClient");

exports.FindAllAuthors = async () => {
    try {
        return await prisma.author.findMany({
            include: {
                Book: true
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindAuthorByID = async (authorID) => {
    try {
        return await prisma.author.findFirst({
            where: { id: authorID },
            include: {
                Book: true
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateAuthor = async (data) => {
    try {
        return await prisma.author.create({
            data: {
                name: data.name,
                bio: data.bio,
                birthdate: data.birthdate
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateAuthor = async (authorID, data) => {
    try {
        return await prisma.author.update({
            where: { id: authorID },
            data: {
                name: data.name,
                bio: data.bio,
                birthdate: data.birthdate
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyAuthor = async (authorID) => {
    try {
        return await prisma.author.delete({
            where: { id: authorID },
        })
    } catch (error) {
        throw error;
    }
}