const prisma = require("../lib/prismaClient");

async function main() {
    // Data dummy
    const authorsData = [
        {
            name: "George Orwell",
            bio: "British writer and journalist",
            birthdate: new Date("1903-06-25"),
            books: [
                {
                    title: "1984",
                    isbn: "9780141036144",
                    publication_year: 1949,
                    genre: "Dystopian",
                },
                {
                    title: "Animal Farm",
                    isbn: "9780141036137",
                    publication_year: 1945,
                    genre: "Satire",
                },
            ],
        },
        {
            name: "Harper Lee",
            bio: "Author of To Kill a Mockingbird",
            birthdate: new Date("1926-04-28"),
            books: [
                {
                    title: "To Kill a Mockingbird",
                    isbn: "9780061120084",
                    publication_year: 1960,
                    genre: "Fiction",
                },
            ],
        },
        {
            name: "J.K. Rowling",
            bio: "Author of Harry Potter series",
            birthdate: new Date("1965-07-31"),
            books: [
                {
                    title: "Harry Potter and the Philosopher's Stone",
                    isbn: "9780747532699",
                    publication_year: 1997,
                    genre: "Fantasy",
                },
                {
                    title: "Harry Potter and the Chamber of Secrets",
                    isbn: "9780747538493",
                    publication_year: 1998,
                    genre: "Fantasy",
                },
            ],
        },
        {
            name: "J.R.R. Tolkien",
            bio: "Author of The Lord of the Rings",
            birthdate: new Date("1892-01-03"),
            books: [
                {
                    title: "The Hobbit",
                    isbn: "9780345339683",
                    publication_year: 1937,
                    genre: "Fantasy",
                },
            ],
        },
        {
            name: "F. Scott Fitzgerald",
            bio: "American novelist of the Jazz Age",
            birthdate: new Date("1896-09-24"),
            books: [
                {
                    title: "The Great Gatsby",
                    isbn: "9780743273565",
                    publication_year: 1925,
                    genre: "Tragedy",
                },
            ],
        },
    ];

    // 1. Create a warehouse
    const warehouse = await prisma.warehouse.create({
        data: {
            name: "Central Warehouse",
            location: "Jakarta",
            capacity: 50000,
        },
    });

    // 2. Create authors and nested books
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

        // 3. Create booksProduct for each book
        for (const book of createdAuthor.Book) {
            await prisma.booksProduct.create({
                data: {
                    bookId: book.id,
                    price: Math.floor(Math.random() * 100000) + 50000, // random price between 50k - 150k
                    stock: Math.floor(Math.random() * 50) + 10, // random stock between 10 - 60
                    format: "Paperback",
                    warehouseId: warehouse.id,
                },
            });
        }
    }

    console.log("✅ Seeder completed with 10+ book products");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
