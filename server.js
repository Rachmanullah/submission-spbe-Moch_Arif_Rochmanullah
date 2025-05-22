const express = require("express");
const dotenv = require("dotenv");
const routes = require('./route');
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Middleware untuk logging
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });
    next();
});

app.use(express.json());

// Routes
app.use('/api', routes);
app.get('/', function (req, res) {
    res.send('Hello from Express API!');
})

app.listen(PORT, () => {
    console.log("Express API running in port : " + PORT);
});

module.exports = app;