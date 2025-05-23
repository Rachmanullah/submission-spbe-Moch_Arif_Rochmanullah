const prisma = require("../lib/prismaClient");
const bcrypt = require("bcryptjs");

async function main() {
    const authorsData = [
        {
            name: "Budi Santosa",
            bio: "Pakar pemrograman Java dan arsitektur perangkat lunak",
            birthdate: new Date("1975-04-12"),
            books: [
                {
                    title: "Pemrograman Java untuk Pemula",
                    isbn: "9786020000001",
                    publication_year: 2015,
                    genre: "Programming",
                },
                {
                    title: "Design Pattern dalam Java",
                    isbn: "9786020000002",
                    publication_year: 2017,
                    genre: "Software Architecture",
                },
            ],
        },
        {
            name: "Siti Aminah",
            bio: "Pakar kecerdasan buatan dan data science",
            birthdate: new Date("1980-08-22"),
            books: [
                {
                    title: "Dasar-Dasar AI",
                    isbn: "9786020000003",
                    publication_year: 2019,
                    genre: "Artificial Intelligence",
                },
                {
                    title: "Machine Learning dengan Python",
                    isbn: "9786020000004",
                    publication_year: 2021,
                    genre: "Machine Learning",
                },
                {
                    title: "Natural Language Processing untuk Semua",
                    isbn: "9786020000005",
                    publication_year: 2022,
                    genre: "NLP",
                },
            ],
        },
        {
            name: "Andi Wijaya",
            bio: "Ahli keamanan siber dan ethical hacking",
            birthdate: new Date("1985-01-30"),
            books: [
                {
                    title: "Mengenal Ethical Hacking",
                    isbn: "9786020000006",
                    publication_year: 2018,
                    genre: "Cybersecurity",
                },
                {
                    title: "Keamanan Web Modern",
                    isbn: "9786020000007",
                    publication_year: 2020,
                    genre: "Cybersecurity",
                },
            ],
        },
        {
            name: "Rina Kusuma",
            bio: "Instruktur data analyst dan big data",
            birthdate: new Date("1987-11-18"),
            books: [
                {
                    title: "Analisis Data dengan SQL",
                    isbn: "9786020000008",
                    publication_year: 2020,
                    genre: "Data Analysis",
                },
                {
                    title: "Big Data untuk Pemula",
                    isbn: "9786020000009",
                    publication_year: 2023,
                    genre: "Big Data",
                },
            ],
        },
        {
            name: "Teguh Prasetyo",
            bio: "Penulis buku tentang pengembangan aplikasi web modern",
            birthdate: new Date("1990-05-05"),
            books: [
                {
                    title: "Fullstack Development dengan Node.js",
                    isbn: "9786020000010",
                    publication_year: 2022,
                    genre: "Web Development",
                },
                {
                    title: "API Development dengan Express",
                    isbn: "9786020000011",
                    publication_year: 2021,
                    genre: "Web Development",
                },
                {
                    title: "Pengembangan REST API untuk Pemula",
                    isbn: "9786020000012",
                    publication_year: 2020,
                    genre: "Web Development",
                },
            ],
        },
    ];

    const warehouse = await prisma.warehouse.create({
        data: {
            name: "Gudang Utama",
            location: "Jakarta",
            capacity: 50000,
        },
    });

    for (const authorData of authorsData) {
        const createdAuthor = await prisma.author.create({
            data: {
                name: authorData.name,
                bio: authorData.bio,
                birthdate: authorData.birthdate,
                Book: {
                    create: authorData.books.map((book) => ({
                        title: book.title,
                        isbn: book.isbn,
                        publication_year: book.publication_year,
                        genre: book.genre,
                    })),
                },
            },
            include: {
                Book: true,
            },
        });

        for (const book of createdAuthor.Book) {
            await prisma.booksProduct.create({
                data: {
                    bookId: book.id,
                    price: Math.floor(Math.random() * 100000) + 50000,
                    stock: Math.floor(Math.random() * 50) + 10,
                    format: "Paperback",
                    warehouseId: warehouse.id,
                },
            });
        }
    }

    // Dummy customer
    const hashedPassword = await bcrypt.hash("12345", 10);
    const customer = await prisma.customer.create({
        data: {
            name: "Raka Saputra",
            email: "raka@example.com",
            address: "Jl. Merdeka No. 10",
            phone: "081234567890",
            password: hashedPassword
        },
    });

    const cart = await prisma.cart.create({
        data: {
            customerId: customer.id,
        },
    });

    const booksProducts = await prisma.booksProduct.findMany({ take: 3 });

    // Add cart items
    for (const bp of booksProducts) {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                booksProductId: bp.id,
                quantity: Math.floor(Math.random() * 3) + 1,
            },
        });
    }

    const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cart.id },
        include: { products: true },
    });

    const totalAmount = cartItems.reduce((acc, item) => {
        return acc + item.products.price * item.quantity;
    }, 0);

    const invoice = await prisma.invoice.create({
        data: {
            cartId: cart.id,
            customerId: customer.id,
            total_amount: totalAmount,
            issued_at: new Date(),
            status: "Pending",
        },
    });

    for (const item of cartItems) {
        await prisma.invoiceItem.create({
            data: {
                invoiceId: invoice.id,
                booksProductId: item.booksProductId,
                quantity: item.quantity,
                price: item.products.price,
            },
        });
    }

    console.log("✅ Seeder selesai: data penulis, buku, produk buku, customer, cart, dan invoice berhasil dibuat");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
