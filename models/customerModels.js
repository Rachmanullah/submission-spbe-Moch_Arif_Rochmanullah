const prisma = require("../lib/prismaClient");
const bcrypt = require("bcryptjs");

exports.FindAllCustomers = async () => {
    try {
        return await prisma.customer.findMany({
            omit: {
                password: true,
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.FindCustomerByID = async (customerID) => {
    try {
        return await prisma.customer.findFirst({
            where: { id: customerID },
        })
    } catch (error) {
        throw error;
    }
}

exports.CreateCustomers = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await prisma.customer.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                address: data.address,
                phone: data.phone,
                carts: {
                    create: {
                        created_at: new Date()
                    }
                }
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.UpdateCustomer = async (customerID, data) => {
    try {
        const oldData = await this.FindCustomerByID(customerID);
        if (!oldData) {
            throw new Error("User not found");
        }

        let hashedPassword = oldData.password;
        const isValidPassword = await bcrypt.compare(data.password, oldData.password);

        if (!isValidPassword) {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }
        return await prisma.customer.update({
            where: { id: customerID },
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                address: data.address,
                phone: data.phone
            }
        })
    } catch (error) {
        throw error;
    }
}

exports.DestroyCustomer = async (customerID) => {
    try {
        return await prisma.customer.delete({
            where: { id: customerID },
        })
    } catch (error) {
        throw error;
    }
}

exports.AuthenticateCustomer = async (email, password) => {
    try {
        const customer = await prisma.customer.findFirst({
            where: {
                email: email,
            }
        });

        if (!customer) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return customer;
    } catch (error) {
        throw error;
    }
}