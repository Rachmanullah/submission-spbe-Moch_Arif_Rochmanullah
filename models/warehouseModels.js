const prisma = require("../lib/prismaClient");

exports.FindAllWarehouse = async () => {
    try {
        return await prisma.warehouse.findMany({
            include: {
                books: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindWarehouseByID = async (warehouseID) => {
    try {
        return await prisma.warehouse.findFirst({
            where: { id: warehouseID },
            include: {
                books: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateWarehouse = async (data) => {
    try {
        return await prisma.warehouse.create({
            data: {
                name: data.name,
                location: data.location,
                capacity: data.capacity
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateWarehouse = async (warehouseID, data) => {
    try {
        return await prisma.warehouse.update({
            where: { id: warehouseID },
            data: {
                name: data.name,
                location: data.location,
                capacity: data.capacity
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyWarehouse = async (warehouseID) => {
    try {
        return await prisma.warehouse.delete({
            where: { id: warehouseID },
        })
    } catch (error) {
        throw error;
    }
}