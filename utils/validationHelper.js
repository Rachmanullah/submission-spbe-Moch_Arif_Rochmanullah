const yup = require('yup');

exports.AuthorValidation = yup.object({
    name: yup.string().required('Name Required'),
    bio: yup.string().nullable(),
    birthdate: yup.date().nullable(),
});

exports.BookValidation = yup.object({
    authorId: yup.string().required('AuthorId Is Required'),
    title: yup.string().required('Title Required'),
    isbn: yup.string().required('ISBN Required'),
    publication_year: yup.date().required('Publication Year'),
    genre: yup.string().required('Genre Required'),
    products: yup.array().of(
        yup.object({
            price: yup.number().required('Price Required'),
            stock: yup.number().required('Stock Required'),
            format: yup.string().nullable(),
            warehouseId: yup.string().required('WarehouseID Required')
        }).nullable()
    )
});

exports.WarehouseValidation = yup.object({
    name: yup.string().required('Name Required'),
    location: yup.string().nullable(),
    capacity: yup.number().required('Capacity Required')
});

exports.BookProductValidation = yup.object({
    bookId: yup.string().required('BookId Required'),
    price: yup.number().required('Price Required'),
    stock: yup.number().required('Stock Required'),
    format: yup.string().nullable(),
    warehouseId: yup.string().required('WarehouseID Required')
});

exports.CustomerValidation = yup.object({
    name: yup.string().required('Name Required'),
    email: yup.string().required('Email Required'),
    password: yup.string().required('Password Required'),
    address: yup.string().nullable(),
    phone: yup.string().nullable()
});

exports.ItemCartValidation = yup.array().of(
    yup.object({
        booksProductId: yup.string().required('Product ID Required'),
        quantity: yup.number().required('Quantity Required')
    })
);